var restify = require('restify');
var builder = require('botbuilder');

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
server.post('/api/Prueba14', connector.listen());



// Crear un procesador LUIS que apunte a nuestro modelo en el root (/)
var model = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/81665186-19f5-4336-9430-615b284dc8b9?verbose=true&timezoneOffset=-360&subscription-key=af56401c0f89430cbbdf295b97dedd6b&q=`;

var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

// Esta función se ejecuta cuando el Intent == ordenarTaxi
dialog.matches('SolicitarTransporte', [
    function (session, args, next) {
        // Extraer las entidades reconocidas por LUIS
        var lugar = builder.EntityRecognizer.findAllEntities(args.entities, 'Lugar');

        if (lugar.length > 0) {
            let msj = 'Okey. Estamos enviando un transporte';
            msj += ` de **${lugar[0].entity}**`;

            if(lugar.length > 1) {
                msj += ` a **${lugar[1].entity}**`;
            }

            session.send(msj);
        }
        else {
            session.send('¿A dónde lo envío?(Indica el origen y el destino)');
        }
    }
]);

dialog.matches('SolicitarTaxi', [
    function (session, args, next) {
        session.send('Ok, cancelaré tu taxi.')
    }
]);

//Este es el Default, cuando LUIS no entendió la consulta.
dialog.onDefault(builder.DialogAction.send("No entendí. Me lo decís de nuevo pero de otra manera, por favor?"));