const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        io.to(roomId).emit('roomJoined');
    });

    socket.on('edit', (content) => {
        const roomId = Object.keys(socket.rooms)[1]; // Get the room ID
        io.to(roomId).emit('update', content);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
