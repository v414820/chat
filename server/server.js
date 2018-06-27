const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// --------------------------------------------------
server.listen(port, () => {
    console.log('Server started on port ' + port);
});