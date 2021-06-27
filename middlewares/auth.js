"use strict";
const jwt = require('jsonwebtoken');
const config = require('../config/default.js');

async function authenticate(req, res, next) {
    if(req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            let token = req.headers['authorization'];
            token = token.split(' ');
            
            if(!token || !token.length || token.length < 1) {
                throw new Error('Header is Invalid');
            }
            
            token = token.pop();
            req.user = await jwt.verify(token, config.middlewares.auth.secret);
        }
        catch(err) {
            return res.status(401).json({
                'error': 'Invalid Token'
            });
        }
    }
    else {
        return res.status(401).json({
            'error': 'Invalid Token'
        });        
    }

    next();
    return;
};

module.exports = authenticate;