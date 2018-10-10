const Pic = require('../models/pic');

function indexRoute(req, res) {
  Pic
    .findById(req.params.picId)
    .populate('comments.addedBy')
    .then(pic => res.status(200).json(pic.comments));
}

function createRoute(req, res, next) {
  Pic
    .findById(req.params.picId)
    .then(pic => {
      pic.comments.push(req.body);
      pic.save();
      return Pic.populate(pic, {path: 'comments.addedBy'});
    })
    .then(pic => res.json(pic))
    .catch(next);
}

function showRoute(req, res, next) {
  Pic
    .findById(req.params.picId)
    .then(pic => {
      const comment = pic.comments.id(req.params.commentId);
      res.json(comment);
    })
    .catch(next);
}

function updateRoute(req, res) {
  Pic
    .findById(req.params.picId)
    .then(pic => {
      // TODO: How do we feel about this? Seems OK to me but...
      const comment = pic.comments.id(req.params.commentId);
      comment.set(req.body);
      pic.save();
      return Pic.populate(pic, {path: 'comments.addedBy'});
    })
    .then(pic => res.json(pic));
}

function deleteRoute(req, res) {
  Pic
    .findById(req.params.picId)
    .then(pic => {
      const comment = pic.comments.id(req.params.commentId);
      comment.remove();
      pic.save();
      return Pic.populate(pic, {path: 'comments.addedBy'});

    })
    // TODO: Don't know why this doesn't work
    .then(pic => pic.execPopulate('comments.addedBy'))
    .then(pic => res.json(pic));
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
