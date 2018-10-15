const Excerpt = require('../models/excerpt');

function createRoute(req, res, next) {
  Excerpt.create(req.body)
    .then(excerpt => res.json(excerpt))
    .catch(next);
}

module.exports = {
  create: createRoute
};
