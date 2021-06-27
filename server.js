"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');

app.use(cors({
    'origin': '*',
    'optionsSuccessStatus': 200
}));

app.use(express.json());


// public api
app.use('/', require('./controllers/users.js')(router));



// protected api
app.use('/api', require('./middlewares/auth.js'));
app.use('/api', require('./controllers/food.js')(router));


module.exports = app;
