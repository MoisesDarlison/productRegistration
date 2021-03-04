const express = require('express');
const route = express();

const { create, index, update, filter, destroy } = require('../controllers/productController')

route.post('/', create);
route.get('/', index);
route.get('/title',filter);
route.get('/:idProduct', filter);
route.put('/:idProduct', update);
route.delete('/:idProduct', destroy);
module.exports = route