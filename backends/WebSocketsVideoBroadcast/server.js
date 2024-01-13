const express = require('express');
const app = express();

const port = 4000;

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);
app.use(express.static(__dirname + '/public'));

io.sockets.on('error', (e) => console.log(e));
server.listen(port, () => console.log(`Server is running on port ${port}`));

let broadcaster;

io.sockets.on('connection', (socket) => {
  socket.on('broadcaster', () => {
    broadcaster = socket.id;
    socket.broadcast.emit('broadcaster');
  });
  socket.on('watcher', () => {
    socket.to(broadcaster).emit('watcher', socket.id);
  });
  socket.on('disconnect', () => {
    socket.to(broadcaster).emit('disconnectPeer', socket.id);
  });
});
