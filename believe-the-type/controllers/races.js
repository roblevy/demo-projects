const Race = require('../models/race');

function create(req, res, next) {
  Race.create(req.body)
    .then(race => res.json(race))
    .catch(next);
}

function index(req, res, next) {
  Race.find()
    .then(races => res.json(races))
    .catch(next);
}

function show(req, res, next) {
  Race.findById(req.params.id)
    .then(race => res.json(race))
    .catch(next);
}

module.exports = {
  create, index, show
};
