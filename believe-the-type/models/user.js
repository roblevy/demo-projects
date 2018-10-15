const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, select: false }
});

userSchema.methods.checkPassword = function(password) {
  return this.password === password;
};

module.exports = mongoose.model('User', userSchema);
