const Log = require('../models/log');

function indexRoute(req, res) {
  return Log
    .find()
    .populate('user', 'email name')
    .then(logs => res.send(logs));
}

function createRoute(req, res) {
  Log
    .create(req.body)
    .then(log => res.status(201).json(log))
    .catch(err => console.log(err));
}

function showRoute(req, res) {
  Log
    .findById(req.params.id)
    .then(log => res.status(200).json(log));
}

function updateRoute(req, res) {
  Log
    .findById(req.params.id)
    .updateOne(req.body)
    .then(() => res.status(200).send('Updated'))
    .catch(err => console.log(err));
}

function deleteRoute(req, res) {
  Log
    .findById(req.params.id)
    .deleteOne()
    .then(() => res.status(200).send('Deleted'))
    .catch(err => console.log(err));
}

function userIndexRoute(req, res, next) {
  Log
    .find({ user: req.params.id })
    .sort({ date: -1 })
    .then(logs => res.json(logs))
    .catch(next);
}

function userTopNRoute(req, res, next) {
  Log
    .find({ user: req.params.id })
    .sort({ date: -1 })
    .limit(parseInt(req.params.n))
    .then(logs => res.json(logs))
    .catch(next);
}

function personalBestsRoute(req, res, next) {
  Log
    .aggregate([
      {
        $group: {
          _id: '$user',
          best: { $max: '$wpm' },
          average: { $avg: '$wpm' }
        }
      }, {
        $lookup: {from: 'users', localField: '_id', foreignField: '_id', as: 'user'}
      }
    ])
    .sort({ average: -1 })
    .then(logs => res.json(logs))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  userLogs: userIndexRoute,
  userTopN: userTopNRoute,
  personalBests: personalBestsRoute
};
