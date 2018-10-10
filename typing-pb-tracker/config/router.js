const router = require('express').Router();
const logs = require('../controllers/logs');
const users = require('../controllers/users');
const auth = require('../controllers/auth');

router.route('/logs')
  .get(logs.index)
  .post(logs.create);

router.route('/logs/best')
  .get(logs.personalBests);

router.route('/logs/:id')
  .get(logs.show)
  .put(logs.update)
  .delete(logs.delete);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/users/:id/logs')
  .get(logs.userLogs);

router.route('/users/:id/logs/:n')
  .get(logs.userTopN);

router.route('/login')
  .post(auth.login);

router.route('/register')
  .post(auth.register);

module.exports = router;
