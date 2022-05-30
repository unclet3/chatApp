//chatapp.js
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
var users = [user];
var user = {
  id:'',
  username:'',
};
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', socket.name + ":  " + msg);
  });

  socket.on('adduser', function (name) {
    socket.name = name;
    socket.broadcast.emit('server message', socket.name + " has connected");
    socket.once('disconnect', function(){
      socket.broadcast.emit('server message', socket.name + " has disconnected");
    });
  });
});


server.listen(3000, () => console.log('listening on *:3000'));

//see if username can be bolded
