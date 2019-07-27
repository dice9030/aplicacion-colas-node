// comando para establecer la comuncicaón

var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect',function(){
    
    console.log('conectado al servidor')
})
//escucha infromación
socket.on('disconnect',function(){
    console.log('perdimos conexion con el servidor')
})

$('button').on('click', function(){
    socket.emit('siguienteTicket',null,function(siguienteTicket){
        label.text(siguienteTicket);
    })
})

socket.on('estadoActual',function(data){
    label.text(data.actual);
    
})

