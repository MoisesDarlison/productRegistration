const express = require('express');
const route = express();

const { update } = require('../controllers/categoryController')

route.put('/:idCategory', update);


module.exports = route