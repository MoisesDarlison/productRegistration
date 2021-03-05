
const Route = require('express').Router();

const { create, index, update, filter, destroy } = require('../controllers/productController')

Route.post('/', create);
Route.get('/title',filter);
Route.get('/', index);
Route.get('/:idProduct', filter);
Route.put('/:idProduct', update);
Route.delete('/:idProduct', destroy);

module.exports = Route