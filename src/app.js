
const express = require('express');
const app = express();

const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');

app.use(express.json());
app.use('/products', productRoute);
app.use('/categories', categoryRoute);

module.exports = app