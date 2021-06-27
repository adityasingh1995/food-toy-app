"use strict";

const config = require('./config/default.js');

const { MongoClient } = require("mongodb");
const uri = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/?poolSize=${config.db.pool}&writeConcern=majority`;


const client = new MongoClient(uri);

client.on('error', (err) => {
    console.error(err);
    throw err;
});

const isConnected = new Promise((resolve, reject) => {
    client.connect((error) => {
        if(error)
            reject(error);
        else
            resolve(true);
    });
});


module.exports = isConnected.then(() => {
    return client.db(config.db.dbName);
});
