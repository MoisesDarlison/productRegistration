
const Route = require('express').Router();

const { create, index, update, filter, destroy } = require('../controllers/productController')

Route.post('/', create);
Route.get('/list', index);
Route.get('/',filter);
Route.put('/:idProduct', update);
Route.delete('/:idProduct', destroy);

module.exports = Route