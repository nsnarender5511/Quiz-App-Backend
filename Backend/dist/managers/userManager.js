"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const QuizManager_1 = require("./QuizManager");
const ADMIN_PASSWORD = "pass";
class UserManager {
    constructor() {
        this.users = [];
        this.quizManager = new QuizManager_1.QuizManager;
    }
    addUser(roomId, socket) {
        this.users.push({ socket, roomId });
        this.createhandlers(roomId, socket);
    }
    createhandlers(roomId, socket) {
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
            if (submission != 1 || submission != 2 || submission != 3 || submission != 4) {
                console.error("Option Doesn't Exists  :: " + submission);
                return;
            }
            this.quizManager.submit(userId, roomId, problemId, submission);
        });
        ///For Admin 
        socket.on("join_admin", (data) => {
            console.log("client Has Joined as Admin");
            if (data.password != ADMIN_PASSWORD) {
                return;
            }
            const userId = this.quizManager.addUser(data.roomId, data.name);
            socket.emit("admin_Init", {
                userId,
                state: this.quizManager.getCurrentState(roomId),
            });
            socket.on("create_Quiz", data => {
                console.log("Admin created a new Quiz !!");
                this.quizManager.addQuiz(data.roomId);
                console.log("Quiz Created " + data.roomId);
            });
            socket.on("create_Problem", data => {
                console.log("new Problem  -  " + data.roomId);
                console.log("Problem created in room", data.roomId);
                console.log("Title:", data.problem.title);
                console.log("Description:", data.problem.desc);
                console.log("Options:", data.problem.options);
                console.log("Correct Answer:", data.problem.answer);
                const roomId = data.roomId;
                this.quizManager.addProblem(data.roomId, data.problem);
            });
            socket.on("next", data => {
                const roomId = data.roomId;
                this.quizManager.next(roomId);
            });
        });
    }
}
exports.UserManager = UserManager;
