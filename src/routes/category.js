const express = require('express');
const route = express();

const { index, update } = require('../controllers/categoryController')

route.get('/', index)
route.put('/:idCategory', update);


module.exports = route