const mongoose  = require('mongoose');

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const atlasURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.en63s.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(atlasURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
 
  module.exports = mongoose;
