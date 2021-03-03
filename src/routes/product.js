const express = require('express');
const route = express();

const { create, index , update} = require('../controllers/productController')

route.post('/', create);
route.get('/', index);
route.put('/:IdProduct',update);



module.exports = route