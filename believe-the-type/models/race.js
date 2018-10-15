const mongoose = require('mongoose');

const raceSchema = mongoose.Schema({
  startedAt: Date,
  duration: Number,
  text: String,
  quoteAuthor: String,
  wordCount: Number
});

module.exports = mongoose.model('Race', raceSchema);
