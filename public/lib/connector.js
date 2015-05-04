'use strict';

let config = require('../config/all.js');

class Connector {
    constructor(printersManager) {
        this.io = require('socket.io')(config.WEBSOCKET_PORT);
        this.printersManager = printersManager;
        this.setupEvents();
    }

    setupEvents() {
        let self = this;

        this.io
            .on('connection', function (socket) {
                socket.on('raw-print', function (data) {
                    self.printersManager.rawPrint(data);
                });
            });
    }
}

module.exports = Connector;