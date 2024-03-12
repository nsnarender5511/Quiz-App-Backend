"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizManager = void 0;
const Quiz_1 = require("../Quiz");
const IoManager_1 = require("./IoManager");
let globalProblemId = 0;
class QuizManager {
    constructor() {
        this.quizes = [];
    }
    addUser(roomId, name) {
        // const quiz = this.getQuiz(roomId);
        // if(quiz) quiz.addUser(name);
        var _a;
        //Optional Chaining
        (_a = this.getQuiz(roomId)) === null || _a === void 0 ? void 0 : _a.addUser(name);
    }
    // public getQuiz(roomId: string){
    //     // const quiz = this.quizes.find(x => x.roomId === roomId);
    //     // return quiz;  
    //     return this.quizes.find(x => x.roomId === roomId) ?? null;
    // }
    getQuiz(roomId) {
        // const quiz = this.quizes.find(x => x.roomId === roomId);
        // return quiz;
        var _a;
        return (_a = this.quizes.find(x => x.roomId === roomId)) !== null && _a !== void 0 ? _a : null;
    }
    start(roomId) {
        var _a;
        const io = IoManager_1.IoManager.getIo();
        (_a = this.getQuiz(roomId)) === null || _a === void 0 ? void 0 : _a.start();
        //if(quiz) quiz.start();
    }
    addProblem(roomId, problem) {
        const quiz = this.getQuiz(roomId);
        quiz === null || quiz === void 0 ? void 0 : quiz.addProblem(Object.assign(Object.assign({}, problem), { id: (globalProblemId++).toString(), startTime: new Date().getTime(), submissions: [], image: "" }));
    }
    submit(userId, roomId, problemId, submission) {
        var _a;
        (_a = this.getQuiz(roomId)) === null || _a === void 0 ? void 0 : _a.submit(userId, roomId, problemId, submission);
    }
    getCurrentState(roomId) {
        const quiz = this.getQuiz(roomId);
        if (!quiz) {
            return null;
        }
        return quiz.getCurrentState();
    }
    next(roomId) {
        const quiz = this.getQuiz(roomId);
        quiz === null || quiz === void 0 ? void 0 : quiz.next();
    }
    addQuiz(roomId) {
        const quiz = new Quiz_1.Quiz(roomId);
        this.quizes.push(quiz);
    }
}
exports.QuizManager = QuizManager;
