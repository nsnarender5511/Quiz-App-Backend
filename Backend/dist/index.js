"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IoManager_1 = require("./managers/IoManager");
const userManager_1 = require("./managers/userManager");
const io = IoManager_1.IoManager.getIo();
const userManager = new userManager_1.UserManager();
io.listen(3000);
console.log("Application started");
// io.on('connection', (socket) => {
//   userManager.addUser("123",socket);
// });
io.on('connection', (socket) => {
    console.log("coonection Establisted !!!");
    userManager.addUser("123", socket);
    io.emit('connection', { roomId: 123 });
});
