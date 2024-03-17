import http from 'http';
import { Server } from 'socket.io';
import { IoManager } from './managers/IoManager';
import { UserManager } from './managers/userManager';

let globalRoomId = 0;


const io = IoManager.getIo();

const userManager = new UserManager();




// io.on('connection', (socket) => {
//   userManager.addUser("123",socket);
// });

io.on('connection', (socket) => {
  console.log("coonection Establisted !!!   ", globalRoomId);

  const roomId = "room#" + globalRoomId++;

  userManager.addUser(roomId, socket);
  io.emit('connection', {roomId: roomId});
});

io.listen(8080);
console.log("Application started Listening on port 8080");

