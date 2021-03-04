
const categoryModel = require('../models/category');

module.exports = {

    async update(req, res) {
        const { idCategory } = req.params;
        const { name } = req.body;

        try {
            const category = await categoryModel.findOne({ _id: idCategory });

            if (!category) {
                return res.status(401).json({ message: "Category does not exist" })
            }

            const categoryAlreadyExists = await categoryModel.findOne({ name })

            if (categoryAlreadyExists) {
                return res.status(401).json({ message: "Category is already registered" })
            }

            category.name = name;
            await category.save();

            return res.status(201).json({ message: `Category ${category.name} edited with sucess` })
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
    async destroy(req, res) {
        const { idCategory } = req.params;

        try {
            const category = await categoryModel.findOne({ _id: idCategory });

            if (!category) {
                return res.status(401).json({ message: "Category does not exist" })
            }

            await categoryModel.deleteMany({ _id: idCategory }).populate('products');

            return res.status(200).json({ message: `Category Delete with sucess` })
        } catch (error) {

            return res.status(400).json({ message: error.message })
        }
    },
}