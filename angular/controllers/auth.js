const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      return res.json({ message: `Logged in as ${user.name}`, token });
    })
    .catch(next);
}

module.exports = {
  login: login,
  register: register
};
