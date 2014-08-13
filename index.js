module.exports = (function () {

    var WebSocketClient = require('./lib/websocket-client');
    var webSocketServer = require('./lib/websocket-server');


    return {
        Client: WebSocketClient,
        server: webSocketServer
    };

})();
