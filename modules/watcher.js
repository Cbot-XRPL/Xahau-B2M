
// Import modules -------------------------------------------
const burn = require('./burn.js');
const importer = require('./importer.js');
var WebSocketClient = require('websocket').client;



// Wrap code in an async function so we can use await -------------------------------------------
async function watcher(address) {

    var client = new WebSocketClient();

    client.on('connectFailed', function (error) {
        console.log('Connect Error: ' + error.toString());
    });

    client.on('connect', function (connection) {
        console.log(`WebSocket client watching ${address} for burns`);
        // Once websocket is open burn on xrp -------------------------------------------
        burn()
        connection.on('error', function (error) {
            console.log("Connection Error: " + error.toString());
        });
        connection.on('close', function () {
            console.log('echo-protocol Connection Closed');
        });
        connection.on('message', function (message) {
            if (message.type === 'utf8') {
                console.log(`Collecting xpop`)
                let data = JSON.parse(message.utf8Data)
                console.log(`Xpop source: ${data.xpop.source}`)
                let blob = data.xpop.blob.toUpperCase()

                // Once websocket detects burn TX import to Xahau -------------------------------------------
                importer(blob)

            }
        });


    });

    client.connect(`wss://xpop.zerp.network/blob/${address}`, 'echo-protocol');
}

module.exports = watcher;