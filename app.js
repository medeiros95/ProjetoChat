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

    socket.on('msgParaServidor',function(data){
        //dialogo
        socket.emit('msgParaCliente', 
        {apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.broadcast.emit('msgParaCliente', 
        {apelido: data.apelido, mensagem: data.mensagem}
        );

        //atualiza participantes
        if(parseInt(data.apelido_atualizado_clientes) == 0){
            socket.emit('participantesParaCliente', 
            {apelido: data.apelido}
            );

            socket.broadcast.emit('participantesParaCliente', 
            {apelido: data.apelido}
            );
        }
    });
});