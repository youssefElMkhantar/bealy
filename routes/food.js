const express = require('express');

const foodController = require('../controllers/food');
const { verify } = require('../controllers/verifyUser');


const router = express.Router();


// routes pour les aliments
router.get('/foods', verify, foodController.getFoods)

router.post('/createFood',verify, foodController.createFood);

router.post('/patchFood',verify, foodController.patchFood);

router.post('/deleteFood',verify, foodController.deleteFood);


// routes pour les list des aliments
router.get('/foodsList',verify, foodController.getFoodsList)

router.post('/createFoodsList',verify, foodController.createFoodsList);

router.post('/patchFoodsList',verify, foodController.patchFoodsList);

router.post('/deleteFoodsList',verify, foodController.deleteFoodsList);


module.exports = router;