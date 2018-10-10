// Mongoose
const { dbUri } = require('../config/environment');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri, { useNewUrlParser: true });

const User = require('../models/user');
const Race = require('../models/race');
const Result = require('../models/result');

const userIds = [
  '5bb777fd8da008a7b72ac190',
  '5bb777fd8da008a7b72ac191',
  '5bb777fd8da008a7b72ac192'
];

const raceIds = [
  '5bb778028da008a7b72ac195'
];

const userData = [
  {
    _id: userIds[0],
    username: 'rob',
    password: 'pass'
  }, {
    _id: userIds[1],
    username: 'dave',
    password: 'pass'
  }, {
    _id: userIds[2],
    username: 'alice',
    password: 'pass'
  }
];

const raceData = [
  {
    _id: raceIds[0],
    startedAt: new Date(),
    duration: 30,
    text: 'A long time ago, in a galaxy far, far away.'
  }
];

const resultData = [
  {
    race: raceIds[0],
    user: userIds[0],
    wpm: 60,
    progress: 40
  }, {
    race: raceIds[0],
    user: userIds[1],
    wpm: 50,
    progress: 60
  }, {
    race: raceIds[0],
    user: userIds[2],
    wpm: 75,
    progress: 100
  }
];

User.collection.drop();
Race.collection.drop();
Result.collection.drop();

User.create(userData)
  .then(users => {
    console.log(`${users.length} users created`);
    return Race.create(raceData);
  })
  .then(races => {
    console.log(`${races.length} races created`);
    return Result.create(resultData);
  })
  .then(results => {
    console.log(`${results.length} results created`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
