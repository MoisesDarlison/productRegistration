const productModel = require('../models/product');
const categoryModel = require('../models/category');

module.exports = {
    async update(req, res) {
        const { idCategory } = req.params;
        const { name } = req.body;

        try {
            const category = await categoryModel.findById(idCategory);

            category.name = name;
            category.save();

            return res.status(201).json({ category })
        } catch (error) {

            return res.status(400).json({ message: error.message })
        }
    },
}