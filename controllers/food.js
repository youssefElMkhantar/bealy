require('dotenv').config();

const Food = require('../models/food');
const FoodList = require('../models/foodList');
 
// controlleurs pour les aliments
exports.getFoods = (req, res, next) => {
    Food.find()
    .then(foods => {
      return res.json({foods: foods})
    })
    .catch(err => {
      console.log(err);
    });
}

exports.createFood = (req, res, next) => {
    const food = new Food({
        label: req.body.label,
        description: req.body.description
    })
    return food.save().then(result => {
        res.json({created: result});
    });
}

exports.patchFood = (req, res, next) => {
    Food.findById(req.body.id)
    .then(food => {
      food.label = req.body.label;
      food.description = req.body.description;
      return food.save().then(result => {
        res.json({updatedFood: result});
      });
    })
    .catch(err => console.log(err));
}

exports.deleteFood = (req, res, next) => {
  Food.deleteOne({ _id: req.body.id })
    .then(() => {
      return res.json({deleted: true});
    })
    .catch(err => console.log(err));
}


// controlleurs pour les list d'aliments
exports.getFoodsList = (req, res, next) => {
    FoodList.find()
    .then(foodList => {
      return res.json({foodList: foodList})
    })
    .catch(err => {
      console.log(err);
    });
}

exports.createFoodsList = (req, res, next) => {
    const foodList = new FoodList({
        foodList: req.body.foodList
    })
    return foodList.save().then(result => {
        res.json({created: result});
    })
    .catch(err => {
        console.log(err);
    });
}

exports.patchFoodsList = (req, res, next) => {
    console.log("id", req.body.id)
    FoodList.findById(req.body.id)
    .then(foodList => {
        foodList.foodList = req.body.foodList;
        return foodList.save().then(result => {
            res.json({updatedFood: result});
        });
    })
    .catch(err => console.log(err));
}

exports.deleteFoodsList = (req, res, next) => {
    FoodList.deleteOne({ _id: req.body.id })
    .then(() => {
      return res.json({deleted: true});
    })
    .catch(err => console.log(err));
}