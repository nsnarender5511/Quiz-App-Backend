import http from 'http';
import { Server } from 'socket.io';
import { IoManager } from './managers/IoManager';
import { UserManager } from './managers/userManager';


const io = IoManager.getIo();

const userManager = new UserManager();
io.listen(3000);

console.log("Application started");


// io.on('connection', (socket) => {
//   userManager.addUser("123",socket);
// });

io.on('connection', (socket) => {
  console.log("coonection Establisted !!!");
  userManager.addUser("123", socket);
  io.emit('connection', {roomId: 123});
});
