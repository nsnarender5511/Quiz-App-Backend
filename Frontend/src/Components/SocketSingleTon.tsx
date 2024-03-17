import { useState } from "react";
import {Socket, io} from "socket.io-client";


let socket:Socket | null = null;

const SocketSigleTon = () => {

   // const [socket, setSocket] = useState<Socket | null>(null);


    if(socket === null){
        console.log("Creating new socket");
        socket = io('http://localhost:8080');
    }
    return socket
    

    

};

export default SocketSigleTon;