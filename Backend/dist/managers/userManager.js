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
            if (data.password != ADMIN_PASSWORD) {
                return;
            }
            const userId = this.quizManager.addUser(data.roomId, data.name);
            socket.emit("adminInit", {
                userId,
                state: this.quizManager.getCurrentState(roomId),
            });
            socket.on("createProblem", data => {
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
