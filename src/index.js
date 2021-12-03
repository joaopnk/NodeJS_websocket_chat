// https://github.com/joaopnk

import express from 'express';
import http from 'http';

import socketio from 'socket.io';


const app = express();
const server = http.Server(app);

app.use(express.static(__dirname + '/public'));

const io = socketio(server);

io.on('connect', (socket) => {

    io.to(socket.id).emit({
        status: true,
        Message: "Conexão estabelicida com o servido!"
    });

    socket.on('chat', (res) => {
        console.log("MENSAGEM RECEBIDA - ", res);



        socket.broadcast.emit('chat', res);
    })
});

app.get('/', (req, res) => {
    res.render('index.html');
});
app.get('/chat', (req, res) => {
    res.send("AULA DE EXPRESS");
});

// localhost:3333
server.listen(3333, () => {
    // console.log("SERVIDOR INICIADO - PORTA:", 3333)
});