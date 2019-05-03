var restify = require('restify'); 
var builder = require('botbuilder'); /*Implementamos el botbuilder*/

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3979, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

var connector = new builder.ChatConnector({  //Con el conector instanciamos el builder a traves del metodo ChatConector
    appId: '',                               // con el cual podemos establecer un canal de comunicacion para chatear con el usuario.
    appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('/api/HolaMundo', connector.listen());


bot.dialog('/',[
    function(session) {
        session.send('Hola Mundo');
    }
])


