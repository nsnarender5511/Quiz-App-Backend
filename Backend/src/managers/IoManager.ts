import { Server } from "socket.io";
import http from 'http';

const httpServer = http.createServer();


export class IoManager{
    private static io: Server;
    
    public static getIo(){
        if(!this.io){
            const io = new Server(httpServer);
            this.io = io;
        }
        
        
        //this.io = io;
        return this.io;
    }
    
}