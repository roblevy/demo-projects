const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  wpm: Number,
  date: Date
});

module.exports = mongoose.model('Log', logSchema);
