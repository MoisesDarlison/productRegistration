const express = require('express');
const route = express();

const { create, index, update, filter } = require('../controllers/productController')

route.post('/', create);
route.get('/', index);
route.get('/title',filter);
route.get('/:IdProduct', filter);
route.put('/:IdProduct', update);

module.exports = route