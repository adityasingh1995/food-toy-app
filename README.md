# food-toy-app

## Setup

1. Install Mongo db, NodeJS

2. Install Packages

```
npm install
```

3. Configuration can be found in config/default.json. Ensure mongo db credentials are correct.

Example Configuration:

```
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
```
4. Migrate data

```
npm run-script migrate
```

5. start the server

```
npm start
```

## API description

1. POST /add-user/
    
    Creates User

    Content-Type: 'Application/json'

    body: {
        'username': String,
        'first_name': String,
        'last_name': String,
        'email': String,
        'password': String
    }

2. POST /login

    Generates Token and logs the user in. This token is required to access all routes under /api

    Content-type: 'Application/json'

    body: {
        "username": String,
        "password": String
    }

3. GET /api/categories

    Gets food categories.

    Authorization: Bearer 'token'

4. GET /api/food/:category

    Gets food items of the requested categories.

    Authorization: Bearer 'token'