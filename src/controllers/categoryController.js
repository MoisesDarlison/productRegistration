
const mongoose = require('mongoose');
const Category = require('../models/category');
const categoryModel = require('../models/category');

module.exports = {

    async create(req, res) {
        const { name } = req.body;

        try {

            let category = await categoryModel.findOne({ name })

            if (category) {
                return res.status(401).json({
                    message: "Catagory alread axists",
                    Categoria: {
                        id: category._id,
                        name: category.name
                    }
                })
            }
            category = await categoryModel.create({ name });

            return res.status(201).json({ category })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }

    },
    async filter(req, res) {
        const { name } = req.query;
        try {
            /**
         * var pattern = "abc #category code\n123 #item number"
         * db.products.find( { sku: { $regex: pattern, $options: "x" } } )
         * option "x" ignora os espacos
         * option "i" ignora difença entre maiusculo e minusculo
          */
            const category = await categoryModel.find({ name: { $regex: name, $options: "i" } }).
                limit(5).select(['name', 'id', 'products']);

            if (category.length < 1) {
                return res.status(404).json({ message: "Category does not exists" })
            }

            return res.status(200).json(category)
        } catch (error) {

            return res.status(500).json({ message: error.message })
        }
    },
    async update(req, res) {
        const { idCategory } = req.params;
        const { name } = req.body;

        try {
            const isValidId = mongoose.Types.ObjectId.isValid(idCategory);
            if (!isValidId) {
                return res.status(401).json({ message: "Category does not exist" });
            }

            const category = await categoryModel.findOne({ _id: idCategory });

            if (!category) {
                return res.status(401).json({ message: "Category does not exist" })
            }

            const nameCategoryAlreadyExists = await categoryModel.findOne({ name })

            if (nameCategoryAlreadyExists._id == category._id) {
                return res.status(401).json({
                    message: "Category already registered", Categoria: {
                        id: nameCategoryAlreadyExists._id,
                        name: nameCategoryAlreadyExists.name
                    }
                })
            }

            category.name = name;

            await category.save();

            return res.status(201).json({ message: `Category ${category.name} edited with sucess` })
        } catch (error) {

            return res.status(500).json({ message: error.message })
        }
    },
    async index(req, res) {
        try {
            const categoryList = await categoryModel.find().select(['name', 'products']);

            return res.status(200).json(categoryList);
        } catch (error) {

            return res.status(500).json({ message: error.message });
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