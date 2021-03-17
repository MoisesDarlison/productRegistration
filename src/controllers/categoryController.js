
const mongoose = require('mongoose');
const Category = require('../models/category');
const categoryModel = require('../models/category');

module.exports = {

    async create(req, res) {
        const { name } = req.body;

        try {
            if (!name) {
                throw { type: 'AccessDenied', status: 401, message: "invalid Name" };
            }

            let category = await categoryModel.findOne({ name })

            if (category) {
                throw {
                    type: 'AccessDenied', status: 401, message: {
                        message: "Catagory alread axists",
                        Categoria: {
                            id: category._id,
                            name: category.name
                        }
                    }
                };
            }
            category = await categoryModel.create({ name });

            return res.status(201).json(category)
        } catch (error) {

            return res.status(error.status || 500).json({ message: error.message })
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
            if (!name) {
                throw { type: 'AccessDenied', status: 404, message: 'Invalid name' };
            }

            const category = await categoryModel.find({ name: { $regex: name, $options: "i" } }).
                limit(5).select(['name', 'id', 'products']);

            if (category.length < 1) {
                throw { type: 'AccessDenied', status: 404, message: 'Category does not exists' };
            }

            return res.status(200).json(category)
        } catch (error) {

            return res.status(error.status || 500).json({ message: error.message })
        }
    },

    async update(req, res) {
        const { idCategory } = req.params;
        const { name } = req.body;

        try {
            const isValidId = mongoose.Types.ObjectId.isValid(idCategory);

            if (!isValidId) {
                throw { type: 'AccessDenied', status: 404, message: 'Category does not exist' };
            }
            if (!name) {
                throw { type: 'AccessDenied', status: 401, message: 'Invalid Name' };
            }

            const category = await categoryModel.findOne({ _id: idCategory });

            if (!category) {
                throw { type: 'AccessDenied', status: 404, message: 'Category does not exist' };
            }

            const nameCategoryAlreadyExists = await categoryModel.findOne({ name })

            if (nameCategoryAlreadyExists && nameCategoryAlreadyExists._id != category._id) {
                throw {
                    type: 'AccessDenied', status: 404,
                    message: {
                        message: "Category already registered", Categoria: {
                            id: nameCategoryAlreadyExists._id,
                            name: nameCategoryAlreadyExists.name
                        }
                    }
                }
            }

            category.name = name;

            await category.save();

            return res.status(201).json({ message: `Category ${category.name} edited with sucess` })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
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
            const isValidId = mongoose.Types.ObjectId.isValid(idCategory);

            if (!isValidId) {
                throw { type: 'AccessDenied', status: 401, message: 'Category does not exist' };
            }

            const category = await categoryModel.findOne({ _id: idCategory });

            if (!category) {
                throw { type: 'AccessDenied', status: 404, message: 'Category does not exist' };
            }

            await categoryModel.deleteMany({ _id: idCategory }).populate('products');

            return res.status(203).send();

        } catch (error) {

            return res.status(error.status || 500).json({ message: error.message })
        }
    },
}