"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IoManager_1 = require("./managers/IoManager");
const userManager_1 = require("./managers/userManager");
let globalRoomId = 0;
const io = IoManager_1.IoManager.getIo();
const userManager = new userManager_1.UserManager();
// io.on('connection', (socket) => {
//   userManager.addUser("123",socket);
// });
io.on('connection', (socket) => {
    console.log("coonection Establisted !!!   ", globalRoomId);
    const roomId = "room#" + globalRoomId++;
    userManager.addUser(roomId, socket);
    io.emit('connection', { roomId: roomId });
});
io.listen(8080);
console.log("Application started Listening on port 8080");
//# sourceMappingURL=index.js.map