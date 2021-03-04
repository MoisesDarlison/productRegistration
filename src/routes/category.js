const express = require('express');
const route = express();

const { index, update ,destroy} = require('../controllers/categoryController')

route.get('/', index)
route.put('/:idCategory', update);
route.delete('/:idCategory', destroy);


module.exports = route