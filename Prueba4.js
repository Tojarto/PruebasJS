var restify = require('restify'); //Invocando a un webServer muy ligero que nos permite exponer comportamientos de aplicaciones web hacia fuera.
var builder = require('botbuilder');

// Levantar restify que es el servidor web y seguidamente especificamos por que puertos queremos escuchar.
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({  //Con el conector instanciamos el builder a traves del metodo ChatConector
    appId: '',                               // con el cual podemos establecer un canal de comunicacion para chatear con el usuario.
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen()); // Esta sera la ruta a traves de la cual estamos escuchando con restfi.

// Dialogos
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¿Cómo te llamas?');
    },
    function (session, results) {
        let msj = results.response;
        session.send(`Hola ${msj}!`);
    }
]);
