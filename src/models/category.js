const mongoose = require('../config/database/DbConfig')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },

});

const Category = mongoose.model('Categories', CategorySchema)

module.exports = Category