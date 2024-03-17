"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoManager = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const httpServer = http_1.default.createServer();
const corsMiddleWare = (0, cors_1.default)();
// //Sexy way to handle CORS
// httpServer.on('request', (req, res) => {
//     // Your code snippet attempts to handle CORS by setting the headers manually, 
//     //but it's important to note that Socket.IO handles its own HTTP server internally, and 
//     //setting headers directly on the httpServer instance may not be sufficient.
//     // corsMiddleWare(req, res, () => {
//     //     res.writeHead(200, {
//     //         'Access-Control-Allow-Origin': '*',
//     //         'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
//     //         'Access-Control-Allow-Headers': 'Content-Type, Authorization'
//     //     });
//     //     res.end();
//     // });
// });
class IoManager {
    static getIo() {
        if (!this.io) {
            const io = new socket_io_1.Server(httpServer, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
                }
            });
            this.io = io;
        }
        //this.io = io;
        return this.io;
    }
}
exports.IoManager = IoManager;
//# sourceMappingURL=IoManager.js.map