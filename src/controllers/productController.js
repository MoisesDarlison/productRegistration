const productModel = require('../models/product');
const categoryModel = require('../models/category');

module.exports = {

    async create(req, res) {

        const { title, description, price, category } = req.body;

        try {
            const productAlreadExists = await productModel.findOne({ title });

            if (productAlreadExists) {
                return res.status(400).json({ message: "Product alread Exists" })
            }

            let categoryObject = await categoryModel.findOne({ name: category })

            if (!categoryObject) {

                categoryObject = await categoryModel.create({ name: category });
            }

            const productRegistred = await productModel.create({ title, description, price, assingTo: categoryObject.id });

            return res.status(201).json({ productRegistred })
        } catch (error) {

            return res.status(400).json({ message: error.message })
        }
    },
    async index(req, res) {

        try {
            const productList = await productModel.find(); //.populate('assingTo')

            return res.status(200).json({ productList })
        } catch (error) {

            res.status(400).json({ message: error.message })
        }

    },
    async update(req, res) {

        const { IdProduct } = req.params;
        const { title, description, price, category } = req.body;

        try {

            const productAlreadExists = await productModel.findById(IdProduct);

            if (!productAlreadExists) {
                return res.status(400).json({ message: "Product does not exists" })
            }

            let categoryObject = await categoryModel.findOne({ name: category })

            if (!categoryObject) {

                categoryObject = await categoryModel.create({ name: category });

            }

            const product = await productModel.updateOne({ _id: IdProduct },
                {
                    $set: {
                        title,
                        description,
                        price,
                        assingTo: categoryObject.id
                    }
                })

            return res.status(201).json({ mesage: "Edit Sucess" })
        } catch (error) {

            console.log(error);
            return res.status(400).json({ message: error.message })
        }
    },
    async filter(req, res) {

        const { IdProduct } = req.params;
        const { title } = req.body;

        try {
            let product

            if (IdProduct) {
                product = await productModel.findOne({ _id: IdProduct });
            }
            if (title) {
                product = await productModel.findOne({ title });
            }

            if (!product) {
                return res.status(400).json({ message: "Product does not exists" })
            }

            return res.status(200).json({ product })
        } catch (error) {

            return res.status(400).json({ message: error.message })
        }
    },

} 
