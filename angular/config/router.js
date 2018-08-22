const router = require('express').Router();
const pics = require('../controllers/pics');
const comments = require('../controllers/comments');
const users = require('../controllers/users');
const imgur = require('../controllers/imgur');
const auth = require('../controllers/auth');

router.route('/pics')
  .get(pics.index)
  .post(pics.create);

router.route('/pics/:id')
  .get(pics.show)
  .put(pics.update)
  .delete(pics.delete);

router.route('/pics/:picId/comments')
  .get(comments.index)
  .post(comments.create);

router.route('/pics/:picId/comments/:commentId')
  .get(comments.show)
  .put(comments.update)
  .delete(comments.delete);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/search/:q')
  .get(imgur.search);

router.route('/login')
  .post(auth.login);

router.route('/register')
  .post(auth.register);

module.exports = router;
