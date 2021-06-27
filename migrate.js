"use strict";
const mongo = require('./db');

// insert donuts
mongo.then((db) => {
    const foodCollection = db.collection('food');
    const foodCategoriesCollection = db.collection('categories');
    
    const foodCategories = [{
        'type': 'donut',
    }, {
        'type': 'pizza',
    }, {
        'type': 'burger',
    }, {
        'type': 'pancake',
    }];
    
    
    const foods = [{
        'name': 'Starwberry Swirl',
        'type': 'donut',
        'vendor': 'Krispy Kreme',
        'price': 8,
        'rating': 4.2,
        'details': 'A long description about this donut',
        'sugar': 8,
        'salt': 10,
        'fat': 5,
        'cholestrol': 2,
        'fav': true
    }, {
        'name': 'Matcha Glazed',
        'type': 'donut',
        'vendor': 'Krispy Kreme',
        'price': 8,
        'rating': 4.2,
        'details': 'A long description about this donut',
        'sugar': 8,
        'salt': 10,
        'fat': 5,
        'cholestrol': 2,
        'fav': true
    }, {
        'name': 'Frosted Falkes',
        'type': 'donut',
        'vendor': 'Dunkin Donuts',
        'price': 8,
        'rating': 4.2,
        'details': 'A long description about this donut',
        'sugar': 8,
        'salt': 10,
        'fat': 5,
        'cholestrol': 2,
        'fav': true
    }, {
        'name': 'Margharita',
        'type': 'pizza',
        'vendor': 'Dominos',
        'price': 8,
        'rating': 4.2,
        'details': 'some pizza',
        'sugar': 8,
        'salt': 10,
        'fat': 5,
        'cholestrol': 2,
        'fav': true
    }, {
        'name': 'Big Mac',
        'type': 'burger',
        'vendor': 'McDonals',
        'price': 8,
        'rating': 4.2,
        'details': 'Some Burger',
        'sugar': 8,
        'salt': 10,
        'fat': 5,
        'cholestrol': 2,
        'fav': true
    }, {
        'name': 'Big Pancake',
        'type': 'pancake',
        'vendor': 'Big Pancake Maker',
        'price': 8,
        'rating': 4.2,
        'details': 'very big pancake',
        'sugar': 8,
        'salt': 10,
        'fat': 5,
        'cholestrol': 2,
        'fav': true
    }];
    
    return foodCollection.deleteMany({}).then(() => {
        return foodCollection.insertMany(foods);
    })
    .then(() => {
        return foodCategoriesCollection.deleteMany({});
    })
    .then(() => {
        return foodCategoriesCollection.insertMany(foodCategories);
    }).then(() => {
        process.exit(0);
    })
})
.catch((err) => {
    console.error(err);
});  
