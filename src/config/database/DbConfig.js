
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_NAME_TEST, NODE_ENV } = process.env;
const atlasURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.en63s.mongodb.net/${NODE_ENV != 'test' ? DB_NAME : DB_NAME_TEST}?retryWrites=true&w=majority`;

mongoose.connect(atlasURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;
