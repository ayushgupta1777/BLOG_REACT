const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model('Box', boxSchema);
