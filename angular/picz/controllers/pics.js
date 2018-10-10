const Pic = require('../models/pic');

function indexRoute(req, res) {
  return Pic
    .find()
    .then(pics => res.send(pics));
}

function createRoute(req, res) {
  Pic
    .create(req.body)
    .then(pic => res.status(201).json(pic))
    .catch(err => console.log(err));
}

function showRoute(req, res) {
  Pic
    .findById(req.params.id)
    .populate('comments.addedBy')
    .then(pic => res.status(200).json(pic));
}

function updateRoute(req, res) {
  Pic
    .findById(req.params.id)
    .updateOne(req.body)
    .then(() => res.status(200).send('Updated'))
    .catch(err => console.log(err));
}

function deleteRoute(req, res) {
  Pic
    .findById(req.params.id)
    .deleteOne()
    .then(() => res.status(200).send('Deleted'))
    .catch(err => console.log(err));
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
