import { Socket } from "socket.io";
import { QuizManager } from "./QuizManager";

const ADMIN_PASSWORD = "pass";

export class UserManager {
    private users : {
        roomId: string;
        socket: Socket;
    }[];

    private quizManager;
    
    constructor(){
        this.users = [];
        this.quizManager = new QuizManager;
    }

    addUser(roomId: string, socket: Socket){
        
        this.users.push( {socket, roomId} );

        this.createhandlers(roomId, socket);

        
    }

    private createhandlers(roomId: string, socket: Socket){
        socket.on("join", (data) => {
            const userId = this.quizManager.addUser(data.roomId, data.name);
            socket.emit("userId", {
                userId,
                state: this.quizManager.getCurrentState(roomId),
            });
        });

        socket.on("submit", (data) => {
            const userId = data.userId;
            const problemId = data.problemId;
            const submission = data.submission;
            if(submission != 1 || submission != 2 || submission != 3 || submission != 4){
                console.error("Option Doesn't Exists  :: " + submission );
                return;
            }
            this.quizManager.submit(userId, roomId, problemId, submission);

        })


        ///For Admin 

        socket.on("join_admin", (data) => {

            if(data.password != ADMIN_PASSWORD){
                return;
            }

            const userId = this.quizManager.addUser(data.roomId, data.name);
            socket.emit("adminInit", {
                userId,
                state: this.quizManager.getCurrentState(roomId),
            });

            socket.on("createQuiz", data=>){
                this.quizManager.addQuiz(data.roomId);  
            }

            socket.on("createProblem", data => {
                const roomId = data.roomId;
                this.quizManager.addProblem(data.roomId, data.problem);
            })
            socket.on("next", data => {
                const roomId = data.roomId;
                this.quizManager.next(roomId);
            })
        });
    }


}