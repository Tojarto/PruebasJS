var builder = require('botbuilder'); /*Implementamos el botbuilder*/
var connector = new builder.ConsoleConnector().listen(); /*Permite unir la consola con un bot que desarrollaremos en la siguiente linea*/
var bot = new builder.UniversalBot(connector); /*Creamos el bot para con el cual vamos a realizar las operaciones necesarias.*/

bot.dialog('/',[
    function(session) {
        let msj = session.message.text;
        session.send(`Me dijiste: ${msj}`);
    }
])

