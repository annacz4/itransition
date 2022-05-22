const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const collectionImageSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String
  }
})

const collectionSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    topic: String,
    deleted: Boolean,
    image: collectionImageSchema
  },
  { _id: false }
);

collectionSchema.plugin(AutoIncrement, { inc_field: 'id'});

const collectionModel = mongoose.model('Collection', collectionSchema);
const collectionImageModel = mongoose.model('CollectionImage', collectionImageSchema);

module.exports = {
  collectionModel,
  collectionSchema,
  collectionImageSchema,
  collectionImageModel
};
