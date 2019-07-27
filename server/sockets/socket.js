const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();

io.on('connection', (client) => {

 
    client.on('siguienteTicket',(data,callback) =>{
        let siguiente = ticketcontrol.siguiente();
        callback(siguiente);
        console.log('cual es el siguiente ticket' + siguiente);

    })

    client.emit('estadoActual',{
        actual: ticketcontrol.getUltimoTicket(),
        ultimos4:ticketcontrol.getUltimos4()
    })

    client.on('atenderTicket',(data,callback) => {
        if(!data.escritorio){
            return callback({
                err: true,
                mesnaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketcontrol.atendertickect(data.escritorio);
        client.broadcast.emit('ultimos4',{
            actual: ticketcontrol.getUltimoTicket(),
            ultimos4:ticketcontrol.getUltimos4()
        })

        callback(atenderTicket);

       

        //actualziar / notificar cambios en los ultimos 4
    })

 
   

});