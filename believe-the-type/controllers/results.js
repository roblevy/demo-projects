const Race = require('../models/race');
const Result = require('../models/result');

function create(req, res, next) {
  req.body.race = req.params.raceId;
  Result.create(req.body)
    .then(race => res.json(race))
    .catch(next);
}

function raceIndex(req, res, next) {
  Race.find({ race: req.params.raceId })
    .then(races => res.json(races))
    .catch(next);
}

function update(req, res, next) {
  Race.findById(req.params.id)
    .updateOne(req.body)
    .then(race => res.json(race))
    .catch(next);
}

module.exports = {
  create, raceIndex, update
};
