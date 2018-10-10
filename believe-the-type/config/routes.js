const express = require('express');
const router = express.Router();

const races = require('../controllers/races');
const results = require('../controllers/results');

router.route('/races')
  .get(races.index)
  .post(races.create);

router.route('/races/:id')
  .get(races.show);


router.route('/races/:raceId/results')
  .get(results.raceIndex)
  .post(results.create);

router.route('/results/:id')
  .put(results.update);

module.exports = router;
