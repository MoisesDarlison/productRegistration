const mongoose = require('../config/database/DbConfig')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        minValue: 0
    },
    assingTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const Product = mongoose.model('Products', ProductSchema);

module.exports = Product;