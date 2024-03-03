import { IoManager } from "./managers/IoManager";

interface User {
    name: string;
    id: string;
    points: number;
}

interface Submission{
    problemId: string;
    userId: string;
    isCorrect: boolean;
    optionSelected: number;
}

interface Problem{
    id: string
    title: string;
    desc: string;
    image: string;
    startTime: number;
    options : {
        id: number;
        title: string;
    }[]
    answer: number;  // 1 2 3 4
    submissions: Submission[];


}


export class Quiz{
    public roomId: string;
    private hasStarted: boolean;
    private problems: Problem[];
    private activeProblem: number;
    private users: User[];
    private currentState: "leaderboard" | "question" | "not_started" | "ended";

    constructor(roomId: string){
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProblem = 0;
        this.users = [];
        this.currentState = "not_started";
    }

    start(){
        this.hasStarted = true;
        this.activeProblem = 0;
        const io = IoManager.getIo();
        io.emit("CHANGE_PROBLEM", {
            problem: this.problems[0],
        })
        this.problems[0].startTime = new Date().getTime();
    }

    next(){
        this.activeProblem++;
        const problem = this.problems[this.activeProblem];
        const io = IoManager.getIo();
        if(problem){
            problem.startTime = new Date().getTime();
            io.emit("CHANGE_PROBLEM", {
                problem
            });
              
        } else {
            //Send Score
            this.sendLeaderBoard();
        }

    }

    setActiveProblem(problem: Problem){
        problem.startTime = new Date().getTime();
        problem.submissions =[];


    }

    sendLeaderBoard(){
        const leaderBoard = this.getLeaderBoard().splice(0, 5);
        IoManager.getIo().to(this.roomId).emit("leaderBoard", {
            leaderBoard
        })
    }

    addProblem(problem: Problem){
        this.problems.push(problem);
    }

    addUser(name: string){
        const id = this.randomString();
        this.users.push( {name, id, points:0} );
        return id;
    }

    submit(userId:string, roomid: string, problemId: string, submission:0|1|2|3){
        const problem = this.problems.find(x => x.id === problemId);
        const user = this.users.find(x => x.id == userId);

        if(problem){
            const existingSubmission = problem.submissions.find(x => x.userId == userId);
            if(existingSubmission){
                console.log("Already Submitted by User");
                return;

            }
            // const isCorrect = (problem.answer == submission);
            // const optionSelected = submission;
            
            problem.submissions.push({
                problemId, 
                userId, 
                isCorrect : (problem.answer == submission), 
                optionSelected : submission
            });
            // 100 intial point, less points as time passes
            
            //user.points += (1000 - ((500 * (new Date().getTime() - problem.startTime)) / 1000));
        
            if(user){
                user.points += (1000 - ((500 * (new Date().getTime() - problem?.startTime)) / 1000));
            }

        }

    }

    getLeaderBoard(){
        return this.users.sort((a,b) => a.points < b.points ? 1 : -1);
    }

    randomString(charSet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
        let result = '';
        const charSetLength = charSet.length;
      
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * charSetLength);
          result += charSet.charAt(randomIndex);
        }
      
        return result;
    }

    getCurrentState(){
        if(this.currentState === "not_started"){
             return { 
                type: "not_started"
            }
        }
        if(this.currentState === "ended"){
            return { 
                type: "ended",
                leaderBoard: this.getLeaderBoard().splice(0,5), 
            }
        }
        if(this.currentState === "leaderboard"){
            return { 
                type: "leaderBoard",
                leaderBoard: this.getLeaderBoard().splice(0,5), 
            }
        }
        if(this.currentState === "question"){
            return { 
                type: "question",
                problem:  this.problems[this.activeProblem],
            }
        }
    }
      
      
      

}