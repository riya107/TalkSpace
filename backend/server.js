const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const socketIo=require("socket.io")
dotenv.config({ path: "./.env" });
const http = require('http');
require("./db");
const Group = require('./models/Group');

const routes = require("./routes");

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const server=http.createServer(app)

const io=socketIo(server)

io.on('connection',(socket)=>{
  socket.on('join',({groupId})=>{
    socket.join(groupId);
  });

  socket.on('sendMessage',async (data)=>{
      const {groupId} = data;
      delete data.groupId;
      await Group.findByIdAndUpdate(
        { _id: groupId },
        {
          $push: {
            messages: data,
          },
        }
      );
      io.to(groupId).emit('message', data)
  });

  socket.on('switching',(data)=>{
      socket.leave(data.groupId);
  });
})


server.listen(process.env.PORT || 80, () => {
  console.log(`connected to port ${process.env.PORT || 80}`);
});