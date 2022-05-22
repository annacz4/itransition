const mongoose = require('mongoose');
const { collectionSchema } = require('./collection');
// const schemaImage = mongoose.Schema({

// }
//)
// const schemaCollection = mongoose.Schema({
//     name: String,
//     description: String,
//     topic: String
// }) 

const schemaUser = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  collections: [collectionSchema],
});

// const Collection = mongoose.model('Collection', schemaCollection);
const User = mongoose.model('User', schemaUser);

module.exports = User;
