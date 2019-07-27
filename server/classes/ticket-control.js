const fs = require('fs');

class Ticket{
    constructor(numero,escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ulitmos4 = [];
        let data = require('../data/data.json');
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets =  data.tickets;
            this.ulitmos4 =  data.ulitmos4;
        }else{
            this.reiniciarConteo()
        }
        
    }

    siguiente(){
        this.ultimo +=1;
        let ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket  ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ulitmos4;
    }

    getUltimoTicket(){
        return `Ticket ${ this.ultimo }`
    }

    atendertickect(escritorio){
      
        if(this.tickets.length === 0){
            return 'Ya no hay mas tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atendertickect = new Ticket(numeroTicket,escritorio);

        this.ulitmos4.unshift(atendertickect); // al inicio del arreglo

        if(this.ulitmos4.length> 4){
            this.ulitmos4.splice(-1,1) //borra el ultimo
        }
        console.log("ulitmos4")
        console.log(this.ulitmos4)

        this.grabarArchivo();
        return atendertickect;

    }

    reiniciarConteo(){
       this.ultimo = 0;
       this.tickets = [];
       this.ulitmos4 = [];
       console.log('Se ha inicializado el sistema')
       this.grabarArchivo();
    }

    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            tickets: this.tickets,
            ulitmos4: this.ulitmos4,
            hoy: this.hoy            
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
        
    }
}

module.exports = {
    TicketControl
}