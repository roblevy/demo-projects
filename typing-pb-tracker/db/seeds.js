const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Log = require('../models/log');
const User = require('../models/user');

const today = new Date();
const yesterday = today - 24*60*60*1000;
const twoDaysAgo = yesterday - 24*60*60*1000;

const logsData = [
  {
    wpm: 60,
    date: today
  },
  {
    wpm: 65, date: yesterday
  },
  {
    wpm: 70, date: twoDaysAgo
  },
  {
    wpm: 90, date: today
  },
  {
    wpm: 95, date: yesterday
  }
];

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  User.create([
    {
      email: 'r@r',
      name: 'Rob',
      password: 'pass',
      imgUrl: '/assets/neptune.jpg'
    },
    {
      email: 's@s',
      name: 'Sheila',
      password: 'pass',
      imgUrl: '/assets/jupiter.jpg'
    }
  ])
    .then(users => {
      console.log(`Created ${users.length} users`);
      logsData[0].user = users[0]._id;
      logsData[1].user = users[0]._id;
      logsData[2].user = users[0]._id;
      logsData[3].user = users[1]._id;
      logsData[4].user = users[1]._id;
      Log.create(logsData)
        .then(logs => {
          console.log(`Created ${logs.length} logs`);
        })
        .catch(err => console.log(err))
        .finally(() => mongoose.connection.close());
    })
    .catch(err => console.log(err));
});
