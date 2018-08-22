const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  addedOn: { type: Date, default: Date.now }
});

const picSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imgUrl: { type: String, required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  addedOn: { type: Date, default: Date.now },
  comments: [commentSchema]
});

module.exports = mongoose.model('Pic', picSchema);
