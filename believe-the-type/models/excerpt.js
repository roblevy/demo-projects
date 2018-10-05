const mongoose = require('mongoose');

const excerptSchema = mongoose.Schema({
  text: String
});

excerptSchema.methods.snippet = function(wordCount) {
  return null;
};

module.exports = mongoose.model('Excerpt', excerptSchema);
