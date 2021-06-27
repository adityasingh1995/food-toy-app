"use strict";



module.exports = function(router) {
    router.get('/categories', async function(req, res) {
        try {
            const mongo = await require('../db.js');
            const foodCategoriesCollection = mongo.collection('categories');
            const foodCategories = await foodCategoriesCollection.find({}).toArray();
            
            res.status(200).json(foodCategories);

            return;
        }
        catch(err) {
            console.error(err);
            res.status(500).json({});
        }
    });

    router.get('/food/:type', async function(req, res) {
        try {
            const mongo = await require('../db.js');

            const foodCollection = mongo.collection('food');
            const foodItems = await foodCollection.find({
                'type': req.params.type
            }).toArray();
            
            res.status(200).json(foodItems);

            return;
        }
        catch(err) {
            console.error(err);
            res.status(500).json({});
        }
    });

    return router;
}