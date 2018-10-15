const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function login(req, res, next) {
  User.findOne({ username: req.body.username })
    .select('+password')
    .then(user => {
      if (!user || !user.checkPassword(req.body.password)) {
        return res.status(401).json({ message: 'unauthorized' });
      }
      const token = jwt.sign({ sub: user._id, username: user.username }, secret, { expiresIn: '6h' });
      return res.json({ message: `Welcome back ${user.username}`, token });
    })
    .catch(next);
}

function register(req, res, next) {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  login, register
};
