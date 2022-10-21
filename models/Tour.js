const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please input a name for tour"],
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 25,
    },
    description: {
        type: String,
        require: [true, "Please input a description"],
    },
    price: {
        type: Number,
        require: true,
        min: [10, "Price have be more than 10tk"]
    },
    image: {
        type: String,
        required: [true, "Please give an image"],
    },
    views: {
        type: Number,
        required: [true, "Please input a value to views"]
    }
}, {
    timestamps: true,
})


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;









