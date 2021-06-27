"use strict";

const jwt = require('jsonwebtoken');
const config = require('../config/default.js');

const crypto = require('crypto');

module.exports = function(router) {
    router.post('/add-user', async function(req, res) {
        try {
            const mongo = await require('../db.js');
            const userData = req.body;

            if(!userData) {
                res.status(422).json({
                    'error': 'no user data'
                });

                return;
            }
            
            const requiredFields = ['username', 'first_name', 'last_name', 'email', 'password']

            for(let i = 0; i < requiredFields.length; i++) {
                const prop = requiredFields[i];
                if(!userData.hasOwnProperty(prop)) {
                    res.status(422).json({
                        'error': 'missing field ' + prop
                    });

                    return;
                }
            }
            
            const usersCollection = mongo.collection('users');

            let alreadyExitingUser = await usersCollection.find({
                '$or': [
                    {
                        'email': userData.email
                    },
                    {
                        'username': userData.username
                    }
                ]
            }).toArray();

            if(alreadyExitingUser.length) {
                res.status(422).json({
                    'error': 'user already exists'
                });

                return;
            }

            const userPassword = crypto.createHash('sha256').update(userData.password).update(config.controllers.users.salt).digest('hex');

            await usersCollection.insertOne({
                'username': userData.username,
                'email': userData.email,
                'first_name': userData.first_name,
                'last_name': userData.last_name,
                'password': userPassword 
            });

            res.status(200).json({
                'status': 'ok'
            });

            return;
        }
        catch(err) {
            console.error(err);
            res.status(500).json({});
        }
    });

    router.post('/login', async function(req, res) {
        try {
            const mongo = await require('../db.js');
            const username = req.body.username.trim();
            const password = req.body.password.trim();

            if(!username || !password) {
                res.status(422).json({
                    'error': 'invalid credentials'
                });

                return;
            }
            
            const usersCollection = mongo.collection('users');
            let userRecord = await usersCollection.find({
                'username': username
            }).toArray();

            if(!userRecord || !userRecord.length) {
                res.status(422).json({
                    'error': 'invalid credentials'
                });

                return;
            }

            userRecord = userRecord.shift();

            const passwordHash = crypto.createHash('sha256').update(password).update(config.controllers.users.salt).digest('hex');
            if(passwordHash !== userRecord.password) {
                res.status(422).json({
                    'error': 'invalid credentials'
                });

                return;
            }

            res.status(200).json({
                'id': userRecord.username,
                'jwt': jwt.sign({
                    'id': userRecord.username
                }, config.middlewares.auth.secret, { expiresIn: config.controllers.users.ttl })
            });

            return;
        }
        catch(err) {
            console.error(err);
            res.status(500).json({});
        }
    });

    return router;
}