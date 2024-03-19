 import { Quiz } from "../Quiz";
import { IoManager } from "./IoManager";
let globalProblemId = 0;

export class QuizManager{
    private quizes: Quiz[];

    constructor(){
        this.quizes = [];
    }

    addUser(roomId: string, name: string){
        // const quiz = this.getQuiz(roomId);
        // if(quiz) quiz.addUser(name);


        //Optional Chaining
        this.getQuiz(roomId)?.addUser(name);
    }

    // public getQuiz(roomId: string){
    //     // const quiz = this.quizes.find(x => x.roomId === roomId);
    //     // return quiz;  

    //     return this.quizes.find(x => x.roomId === roomId) ?? null;
    // }

    public getQuiz(roomId: string): Quiz | null {
        // const quiz = this.quizes.find(x => x.roomId === roomId);
        // return quiz;
      
        return this.quizes.find(x => x.roomId === roomId) ?? null;
      }

      

    public start(roomId: string){
        const io = IoManager.getIo();
        this.getQuiz(roomId)?.start();
        //if(quiz) quiz.start();
        
    }

    public addProblem(roomId: string, problem: {
                    title: string;
                    desc: string;
                    options : {
                        id: number;
                        title: string;
                    }[]
                    answer: number;  // 1 2 3 4
                }){

                const quiz = this.getQuiz(roomId);
                quiz?.addProblem({
                    ...problem, 
                    id: (globalProblemId++).toString(),
                    startTime: new Date().getTime(),
                    submissions: [],
                    image : ""
                });


    }

    public submit(userId: string, roomId: string, problemId: string, submission: 0|1|2|3){
        this.getQuiz(roomId)?.submit(userId, roomId, problemId, submission);
    }


    getCurrentState(roomId: string){
        const quiz = this.getQuiz(roomId);
        if(!quiz){
            return null;
        }
        return quiz.getCurrentState();
    }

    public next(roomId: string){
        const quiz = this.getQuiz(roomId);
        quiz?.next();
    }

    public addQuiz(roomId: string){
        const quiz = new Quiz(roomId);
        this.quizes.push(quiz);
    }

    public getAllQuizes(){
        return this.quizes;
    }


}