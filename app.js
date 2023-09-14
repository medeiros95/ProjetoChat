//configuracao servidor
let app = require('./config/server');

//parametrizar porta de escuta
let server = app.listen(80, function(){
    console.log('server online');
});

let io = require('socket.io').listen(server);

app.set('io', io);

//criar conexao websocket
io.on('connection',function(socket){
    console.log('usuario conectou');

    socket.on('disconnect', function(){
        console.log('usuario desconectou');
    });
});