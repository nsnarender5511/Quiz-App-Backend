import http from 'http';
import { Server } from 'socket.io';
import { IoManager } from './managers/IoManager';
import { UserManager } from './managers/userManager';

let globalRoomId = 0;


const io = IoManager.getIo();

const userManager = new UserManager();
io.listen(3000);

console.log("Application started");


// io.on('connection', (socket) => {
//   userManager.addUser("123",socket);
// });

io.on('connection', (socket) => {
  console.log("coonection Establisted !!!");

  const roomId = "room#" + globalRoomId++;

  userManager.addUser(roomId, socket);
  io.emit('connection', {roomId: roomId});
});
