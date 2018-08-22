const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  imgUrl: { type: String, default: '/assets/unknown-user.png'}
});

// Before saving the user, hash their password using bcrypt's
// syncronous hashing function
userSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    // Can generate the salt specifying the salt rounds:
    // var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    this.password = bcrypt.hashSync(this.password, 8);
  }

  next();
});

// compareSync compares a plain text password against the hashed one stored on the user object
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
