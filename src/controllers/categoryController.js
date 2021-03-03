
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
    async index(req, res) {

        try {
            const categoryList = await categoryModel.find().populate('products'); 

            return res.status(200).json({ categoryList })
        } catch (error) {

            res.status(400).json({ message: error.message })
        }

    },
}