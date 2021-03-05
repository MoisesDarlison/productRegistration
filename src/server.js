
const express = require('express');
require('dotenv').config();
const app = express();

const { PORT = 3000 } = process.env
const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');

app.use(express.json());
app.use('/products', productRoute);
app.use('/categories', categoryRoute);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));