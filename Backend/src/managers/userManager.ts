import { Socket } from "socket.io";
import { QuizManager } from "./QuizManager";
import { ElasticSingleton } from "../DAO/ElasticSingleton";

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
       //when client first Joins
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

        socket.on("join_admin", async (data) => {
            

            if(data!= ADMIN_PASSWORD){
                socket.emit("admin_Init_failed", {"Worng PassWord !!":String});
                return;
            }
            console.log("client Has Joined as Admin");


            const userId = this.quizManager.addUser(data.roomId, data.name);
            socket.emit("admin_Init", {
                userId,
                state: this.quizManager.getCurrentState(roomId),
                roomId: roomId,
                quizes: await this.quizManager.getAllQuizes(),

            });

            socket.on("create_Quiz", data=> {
                console.log("Admin created a new Quiz !!");
                this.quizManager.addQuiz(data.roomId); 
                console.log("Quiz Created " + data.roomId);
                socket.emit("quiz_created", {roomId: data.roomId});                                                              
            });

            socket.on("create_Problem", data => {
                console.log("new Problem  -  " + data.roomId );
                console.log("Problem created in room", data.roomId);
                console.log("Title:", data.problem.title);
                console.log("Description:", data.problem.desc);
                console.log("Options:", data.problem.options);
                console.log("Correct Answer:", data.problem.answer);

                const roomId = data.roomId;
                this.quizManager.addProblem(data.roomId, data.problem);

                if(data.problem.islastPrblem){
                    console.log("Last Problem Created");
                    //to persist data here
                    console.log("Persisting Data to Elastic Search");
                    ElasticSingleton.getClient().index({
                        index : "quiz",
                        body: {
                            userId: "Admin",
                            Quiz: this.quizManager.getQuiz(roomId),

                        }
                    });

                    socket.emit("Last_Problem_Created", {userId,
                        state: this.quizManager.getCurrentState(roomId),
                        roomId: roomId,
                        quizes: this.quizManager.getAllQuizes(),
                });
                }else{
                    console.log("Next Problem Created");
                    socket.emit("Problem_Created", data);
                
                }

            })
            socket.on("next", data => {
                const roomId = data.roomId;
                this.quizManager.next(roomId);
            })
        });

        
    }


}