const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const message = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server); // gives access to socket.io.js
// --------------------------------------------------
app.use(express.static(publicPath));
// --------------------------------------------------
io.on('connection', (socket) => {
    console.log('User connected');
    socket.emit('newMessage', message.generateMessage('Admin', 'Welcome user'));
    socket.broadcast.emit('newMessage', message.generateMessage('Admin','Another user connected'));

    socket.on('createMessage', msg => {
        io.emit('newMessage', message.generateMessage(msg.from,msg.text));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// --------------------------------------------------
server.listen(port, () => {
    console.log('Server started on port ' + port);
});