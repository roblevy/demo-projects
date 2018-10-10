const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Promise = require('bluebird');
const router = require('./config/router');
const { port, dbURI } = require('./config/environment');
// This allows req.body to contain the request body
const bodyParser = require('body-parser');
// This deals with session cookies
// Appends a .session object to every request
const session = require('express-session');

// Set up mongoose to use bluebird promises instead
// of its own built-in promise mechanism
mongoose.Promise = Promise;
mongoose.connect(dbURI);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'KeWkqeoM5V.RRQQ.hs.Bq', // a random key used to encrypt the session cookie
  resave: false,
  saveUninitialized: false
}));
// Custom authentication Middleware
app.use((req, res, next) => {
  // if there is no user ID, then there is nothing to do, move on to the routes
  if(!req.session.userId) return next();

  // otherwise use the ID to find the user in the database
  User
    .findById(req.session.userId)
    .then(user => {

      // if the user hasn't been found (perhaps if they have deleted their account)
      // log them out (ie delete the data in the session)
      if(!user) req.session.regenerate(() => res.redirect('/login'));

      // add some helpers to res.locals to be used in the views
      res.locals.isAuthenticated = true;
      res.locals.currentUser = user;

      // store the user data on `req` to be used inside the controllers
      req.currentUser = user;

      next();
    });
});

app.use((req, res, next) => {
  console.log('Caught request', req.url, req.method);
  next();
});

// Router(s)
app.get('/assets', (req, res) => {
  const path = req.url;
  console.log(path);
  res.sendFile(`${__dirname}/public/${path}`);
});

// Use the router we've created
app.use('/api', router);

// send the index.html page for any non API related requests
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
