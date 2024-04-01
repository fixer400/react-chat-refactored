const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT || "3001";
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
let corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://react-chat-for-bingo-bongo.vercel.app/",
  ],
  optionsSuccessStatus: 200,
};
let rooms = [];
class room {
  constructor(roomName) {
    this.roomName = roomName;
    this.users = [];
    this.messages = [];
  }
}

function findRoom(roomName) {
  return rooms.find((room) => room.roomName == roomName);
}

app.use(express.static(__dirname), cors(corsOptions));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//Get message by room name
app.get("/messages/:roomid", (req, res) => {
  let currentRoomId = findRoom(req.params.roomid);
  res.send(currentRoomId.messages);
});

app.get("/rooms", (req, res) => {
  res.send(rooms);
});
//Conncetion to sockets
io.on("connection", (socket) => {
  let currentRoomId;
  socket.on("join server", (roomName) => {
    socket.join(roomName);
    if (findRoom(roomName) == undefined) {
      console.log(roomName);
      rooms.push(new room(roomName));
    }
    currentRoomId = findRoom(roomName);
    //Send notification about new user
    currentRoomId.users
      .filter((user) => user.id != socket.id)
      .forEach((user) => io.to(user.id).emit("new user"));
  });

  socket.on("send message", (data) => {
    currentRoomId.messages.push({
      userName: data.userName,
      message: data.message,
    });
    io.to(currentRoomId.roomName).emit("get messages");
    currentRoomId.users
      .filter((user) => user.id != socket.id)
      .forEach((user) => io.to(user.id).emit("new message"));
  });

  socket.on("set user", (data) => {
    console.log(data);
    currentRoomId.users.push({ name: data.userName, id: socket.id });
    io.to(currentRoomId.roomName).emit("get users", currentRoomId.users);
  });

  socket.on("disconnect", () => {
    if (currentRoomId != undefined) {
      //Delete user in room on leave
      currentRoomId.users = currentRoomId.users.filter(
        (user) => user.id != socket.id,
      );
      //
      io.to(currentRoomId.roomName).emit("get users", currentRoomId.users);
      //Delete room when all users leave
      if (currentRoomId.users.length == 0) {
        rooms = rooms.filter((room) => room.roomName != currentRoomId.roomName);
      }
      //
    }
  });
});

server.listen(PORT, () => {
  console.log("listening on *:3001");
});
