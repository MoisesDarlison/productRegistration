
const Route = require('express').Router();

const { index, update ,destroy} = require('../controllers/categoryController')

Route.get('/', index)
Route.put('/:idCategory', update);
Route.delete('/:idCategory', destroy);

module.exports = Route