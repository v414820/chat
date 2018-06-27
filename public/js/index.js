let socket = io(); 

socket.on('connect', () => {
    document.querySelector('h1').textContent = 'CONNECTED';

    /*socket.emit('createMessage', {
        from: 'me',
        text:'Hola [kisses]'
    });*/
});

socket.on('disconnect', () => {
    document.querySelector('h1').textContent = 'DISCONNECTED';
});

socket.on('newMessage', msg => {
    console.log(msg);
});