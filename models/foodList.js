const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodListSchema = new Schema({
    foodList: [{
        label: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('foodList', foodListSchema);
