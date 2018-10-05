const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
  race: { type: mongoose.Schema.ObjectId, ref: 'Race' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  wpm: Number,
  progress: Number,
  complete: { type: Boolean, default: false }
});

module.exports = mongoose.model('Result', resultSchema);
