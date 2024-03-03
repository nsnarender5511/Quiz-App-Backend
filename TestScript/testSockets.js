const io = require('socket.io-client');

// Replace 'http://your-socket-server-url' with the actual URL of your Socket.IO server
const socket = io('http://localhost:3000');

console.log("Client Running");

// Emit an event to the server
socket.emit('connection', 'Hello, server!');

// Handle the server's response
socket.on('connection', (data) => {
  console.log("coonection Establisted !!!");
  console.log("roomId  ::  " + data.roomId);

  // Disconnect after receiving the response
  socket.disconnect();
});
