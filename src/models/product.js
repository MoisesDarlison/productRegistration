const mongoose = require('../config/database/DbConfig')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
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