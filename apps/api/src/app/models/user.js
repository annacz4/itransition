const mongoose = require('mongoose');

// const schemaImage = mongoose.Schema({

// }
// )
// const schemaCollection = mongoose.Schema({
//     name: String;
//     description: String;
//     topic: String;
//     image:

// })
const schemaUser = mongoose.Schema({
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
  // collection: [schemaCollection]
});

module.exports = mongoose.model('User', schemaUser);
