const express = require('express');

const foodController = require('../controllers/food');

const router = express.Router();


// routes pour les aliments
router.get('/foods', foodController.getFoods)

router.post('/createFood', foodController.createFood);

router.post('/patchFood', foodController.patchFood);

router.post('/deleteFood', foodController.deleteFood);


// routes pour les list des aliments
router.get('/foodsList', foodController.getFoods)

router.post('/createFoodsList', foodController.createFood);

router.post('/patchFoodsList', foodController.patchFood);

router.post('/deleteFoodsList', foodController.deleteFood);
