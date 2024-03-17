import LoginSignup from "./Components/LoginSignup/LoginSignup";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { relative } from "path";

import io from "socket.io-client";
import { Socket } from "dgram";
import SocketSigleTon from "./Components/SocketSingleTon";
// async function connectToServer(socket: Socket){
//   //PROMISE
//   try{
//     const await socket = io('http://localhost:8080');
//     socket.emit('connection', "Hello from client");
//     socket.on('connection', (data)=>{
//       console.log("Server message - ",data);
//     }
//   });
//   catch(error){
//     console.log("Error in connecting to server", error);
//   }
// }

    
function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [roomId, setRoomId] = React.useState("");

  const socket = SocketSigleTon();
  
  socket.emit("connection", "Hello from client");
  
  useEffect(() => {


    socket.on("connection", (data) => {
      console.log("socket id - ", socket.id);
      console.log("roomId - ", data.roomId);
      setRoomId(data.roomId);
      setIsConnected(true);      //setIsConnected true;
    });
  }, []);

  // Problem of doing this way is polling is there but web

  // const socket = io("http://localhost:8080");
  // socket.on("connection", (data) => {
  //   console.log("socket id - ", socket.id);
  //   console.log("rommId - ", data.roomId);
  //   console.log("Server message - ");
  //   setIsConnected(true);
  // });

  


  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        backgroundColor: "dark",
      }}
    >
      <h1>Welcome to Quizzzz!!!</h1>
      <div className="d-flex justify-content-center align-items-center vh-100">
        {isConnected ? <LoginSignup roomId={roomId}/> : <h1>Cant Connect To Server</h1>}
      </div>
    </div>
  );
}

export default App;
