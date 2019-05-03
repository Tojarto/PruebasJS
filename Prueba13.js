var restify = require('restify');
var builder = require('botbuilder');
//Llamamos a este paquete para poder especificar mas adelante el nombre de la aplicacion 
//y la key de la aplicacion sin tener la necesidad de tener que mostrarlo en texto plano.
//var dotenv = require('dotenv');

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/Prueba13', connector.listen());

// Para utilizar variables de entorno
//dotenv.config(); 

//Estas son las dos variables de entorno que vamos a utilizar posteriormente para poder pasarle el nombre de nuestra aplicacion y la key.
//Pero para ello primero tendremos que crear un archivo de configuracion para poder pasarle estas dos variables de entorno.
//let luisApp = process.env.LUIS_APP;
//let luisKey = process.env.LUIS_KEY;

// Crear un procesador LUIS que apunte a nuestro modelo en el root (/)
// Aqui en la URL es donde le pasamos el nombre de nuesta aplicacion y la key para no tener que escribirlo en texto plano.
// Para ello tendremos que crear un archivo de config para poder pasarle estos parametros de entrada.
var model = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/81665186-19f5-4336-9430-615b284dc8b9?verbose=true&timezoneOffset=-360&subscription-key=af56401c0f89430cbbdf295b97dedd6b&q=`;

//Este es el reconocedor de LUIS que se encarga de pillar el modelo que hemos especificado previamente.
var recognizer = new builder.LuisRecognizer(model);
// Aqui especificamos que el dialogo que vamos a utilizar va a ser de tipo Intent
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);


// Esta función se ejecuta cuando el Intent == SolicitarTransporte
dialog.matches('SolicitarTransporte', [
    
    function (session, args, next) {
        builder.Prompts.text(session, '¿A dónde lo envío?');
    },
    function (session, args1, next) {
        builder.Prompts.text(session, '¿A que hora lo quieres?');
    },
    function(session, args) {
        session.send(`Enviando transporte a **${args.response}**`)
    },
    
    function(session, args1) {
        session.send(`Enviando transporte a las **${args1.response}**`)
    },
]);

//Funcion que se ejecuta cuando el intent es CancelarTaxi
dialog.matches('SolicitarTaxi', [
    function (session, args, next) {
        session.send('Ok, cancelaré tu taxi.')
    }
]);

//Este es el dialogo por defecto, cuando LUIS no entiende la consulta que le acabamos de hacer.
dialog.onDefault(builder.DialogAction.send("No entendí. Me lo decís de nuevo pero de otra manera, por favor?"));