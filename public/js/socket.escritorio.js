var socket = io();

socket.on('connect',function(){
    
    console.log('conectado al servidor')
})
//escucha infromación
socket.on('disconnect',function(){
    console.log('perdimos conexion con el servidor')
})


var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');
$('h1').text('Escritorio: ' + escritorio)


$('button').on('click', function(){
    socket.emit('atenderTicket',{escritorio:escritorio}, function(resp){
        if(resp === 'Ya no hay mas tickets'){
            label.text(resp);
            alert(resp);
            return;
        }
        label.text(resp.numero)
    })
})
console.log(escritorio)

