module.exports = {
    'server': {
        'port': 8000
    },
    'controllers': {
        'food': {},
        'users': {
            'salt': 'somesalt123123',
            'ttl': 60*60
        }
    },
    'middlewares': {
        'auth': {
            'secret': 'somesecret123456'
        }
    },
    'db': {
        'host': '127.0.0.1',
        'port': 27017,
        'pool': 20,
        'user': 'aditya',
        'password': 'aditya',
        'dbName': 'aditya'
    }
};