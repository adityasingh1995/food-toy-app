"use strict";

const config = require('./config/default.js');
const server = require('./server.js');

server.listen(config.server.port, () => {
    console.log('Server Listening on ', config.server.port);
});
