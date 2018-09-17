const User = require('../models/user');

function indexRoute(req, res) {
  User
    .find()
    .then(users => res.status(200).json(users));
}

function showRoute(req, res) {
  User
    .findById(req.params.id)
    .then(user => res.status(200).json(user));
}

function updateRoute(req, res) {
  User
    .findById(req.params.id)
    .updateOne(req.body)
    .then(() => res.status(200).send('Updated'))
    .catch(err => console.log(err));
}

function deleteRoute(req, res) {
  User
    .findById(req.params.id)
    .deleteOne()
    .then(() => res.status(200).send('Deleted'))
    .catch(err => console.log(err));
}



module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
