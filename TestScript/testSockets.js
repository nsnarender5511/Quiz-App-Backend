const io = require('socket.io-client');

// Replace 'http://your-socket-server-url' with the actual URL of your Socket.IO server
const socket = io('http://localhost:8080');

console.log("Client Running");

// Emit an event to the server
socket.emit('connection', 'Hello, server!');

// Handle the server's response
socket.on('connection', (data) => {
  console.log("coonection Establisted !!!");
  console.log("roomId  ::  " + data.roomId);

  const roomId = data.roomId;

  socket.emit("join_admin", {
    password : "pass"
  });
  
  socket.on("admin_Init", data => {
    console.log("Admin User Intiated  ::  "+data);
  });

  socket.emit("create_Quiz", {
    roomId : roomId
  });



  socket.emit("create_Problem", {
    roomId: roomId,
    problem: {
      title: "Q1",
      desc: "What is 1+2?",
      options: [
        { id: 1, title: "1" },
        { id: 2, title: "2" },
        { id: 3, title: "3" },
        { id: 4, title: "4" }
      ],
      answer: 3 // Assuming 3 is the correct answer
    }
  });

  // Problem 2
socket.emit("create_Problem", {
  roomId: roomId,
  problem: {
    title: "Q2",
    desc: "What is the capital of France?",
    options: [
      { id: 1, title: "Berlin" },
      { id: 2, title: "Madrid" },
      { id: 3, title: "Paris" },
      { id: 4, title: "London" }
    ],
    answer: 3 // Paris is the correct answer
  }
});

// Problem 3
socket.emit("create_Problem", {
  roomId: roomId,
  problem: {
    title: "Q3",
    desc: "Which planet is known as the Red Planet?",
    options: [
      { id: 1, title: "Earth" },
      { id: 2, title: "Mars" },
      { id: 3, title: "Jupiter" },
      { id: 4, title: "Venus" }
    ],
    answer: 2 // Mars is the correct answer
  }
});

// Problem 4
socket.emit("create_Problem", {
  roomId: roomId,
  problem: {
    title: "Q4",
    desc: "What is the square root of 25?",
    options: [
      { id: 1, title: "3" },
      { id: 2, title: "4" },
      { id: 3, title: "5" },
      { id: 4, title: "6" }
    ],
    answer: 3, // 5 is the correct answer,
    isLastProblem: true
  }
});

  


});







