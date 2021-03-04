const productModel = require('../models/product');
const categoryModel = require('../models/category');

module.exports = {

    async create(req, res) {

        const { title, description, price, category } = req.body;

        try {
            const productAlreadExists = await productModel.findOne({ title });

            if (productAlreadExists) {
                return res.status(401).json({ message: "Product alread Exists" })
            }

            let categoryObject = await categoryModel.findOne({ name: category })

            if (!categoryObject) {
                categoryObject = await categoryModel.create({ name: category });
            }

            const productRegistred = await productModel.create({
                title,
                description,
                price,
                assingTo: categoryObject.id
            });

            categoryObject.products.push(productRegistred._id);

            await categoryObject.save();

            return res.status(201).json({ productRegistred });
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

        const { idProduct } = req.params;
        const { title, description, price, category } = req.body;

        try {

            const productIdParams = await productModel.findById(idProduct);
            if (!productIdParams) {
                return res.status(404).json({ message: "Product does not exists" })
            }

            /***
             * verifica se ja exit algum produto com o mesmo nome Caso 
             * TRUE e NAO seja este mesmo ID passado nos params
             *  sera retornado o produto existente com mesmo nome
             */
            const titleAlreadExist = await productModel.findOne({ title })
            if (titleAlreadExist && (titleAlreadExist._id.toString() !== productIdParams._id.toString())) {
                return res.status(404).json({ message: "Product title alread exists", titleAlreadExist })
            }

            /**
             * Verifica se a categoria existe caso
             * FALSE é criada uma categoria e adicionado a variavel CategoryObject 
             */
            let categoryObject = await categoryModel.findOne({ name: category })
            if (!categoryObject) {
                categoryObject = await categoryModel.create({ name: category });
            }

            //Edita o produto e retorna ele ja atualizado com o new:true
            const product = await productModel.findOneAndUpdate({ _id: idProduct },
                {
                    $set: {
                        title, description, price, assingTo: categoryObject._id
                    }
                }, { new: true });

            //remove o product da categoria 
            const productRemoveOldCategory = await categoryModel.findOne({ _id: productIdParams.assingTo })
            productRemoveOldCategory.products.pull(idProduct)

            //add o produto na categoria
            categoryObject.products.push(idProduct);

            await productRemoveOldCategory.save();
            await categoryObject.save();

            return res.status(201).json({ product })
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

            if (IdProduct || title) {
                product = await productModel.findOne({ $or: [{ _id: IdProduct }, { title }] });
            }

            if (!product) {
                return res.status(400).json({ message: "Product does not exists" })
            }

            return res.status(200).json({ product })
        } catch (error) {

            return res.status(400).json({ message: error.message })
        }
    },
    async destroy(req, res) {
        const { idProduct } = req.params;

        try {
            const product = await productModel.findOne({ _id: idProduct });

            if (!product) {
                return res.status(401).json({ message: "Product does not exist" })
            }

            await productModel.deleteMany({ _id: idProduct }).populate('assyngTo');

            return res.status(200).json({ message: `Product Delete with sucess` })
        } catch (error) {

            return res.status(400).json({ message: error.message })
        }
    },
}
