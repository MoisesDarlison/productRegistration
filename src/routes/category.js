
const Route = require('express').Router();

const {create, index, update ,destroy, filter} = require('../controllers/categoryController')

Route.post('/', create);
Route.get('/list', index);
Route.get('/', filter);
Route.put('/:idCategory', update);
Route.delete('/:idCategory', destroy);

module.exports = Route