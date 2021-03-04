const mongoose = require('../config/database/DbConfig')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },

});

const Category = mongoose.model('Categories', CategorySchema)

module.exports = Category