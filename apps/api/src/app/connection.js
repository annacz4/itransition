const mongoose = require('mongoose')

const mongoDb = mongoose.connect('mongodb://127.0.0.1/itransition');
const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err);
})

module.exports = db;