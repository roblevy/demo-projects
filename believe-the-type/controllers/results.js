const Race = require('../models/race');
const Result = require('../models/result');
const User = require('../models/user');

function create(req, res, next) {
  req.body.race = req.params.raceId;
  Result.findOne({ race: req.body.race, user: req.body.user })
    .then(result => {
      if (!result) {
        return Result.create(req.body);
      }
      console.log('result is', result);
      result.set(req.body);
      return result.save();
    })
    .then(race => res.json(race))
    .catch(next);
}

function raceIndex(req, res, next) {
  console.log('Finding results for race', req.params.raceId);
  Result.find({ race: req.params.raceId })
    .populate('user', 'username')
    .then(results => res.json(results))
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
