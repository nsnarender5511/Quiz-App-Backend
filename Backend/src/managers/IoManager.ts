import { Server } from "socket.io";
import http from 'http';
import cors from 'cors';

const httpServer = http.createServer();

const corsMiddleWare = cors();


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

export class IoManager{
    private static io: Server;
    
    public static getIo(){
        if(!this.io){
            const io = new Server(httpServer, {
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