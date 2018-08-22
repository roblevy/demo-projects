const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Pic = require('../models/pic');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  User.create([
    {
      email: 'r@r',
      name: 'Rob',
      password: 'r',
      imgUrl: '/assets/neptune.jpg'
    },
    {
      email: 's@s',
      name: 'Sheila',
      password: 's',
      imgUrl: '/assets/jupiter.jpg'
    }
  ])
    .then(users => {
      console.log(`Created ${users.length} users`);
      Pic.create([
        {
          title: 'my title',
          imgUrl: 'https://i.imgur.com/MfnjnRG.jpg',
          addedBy: users[0],
          comments: [
            {
              text: 'I enjoy commenting!',
              addedBy: users[0]
            }, {
              text: 'Nice one! Me too!',
              addedBy: users[1]
            }, {
              text: 'Woah!',
              addedBy: users[0]
            }, {
              text: 'Urk!',
              addedBy: users[1]
            }, {
              text: 'ROFL',
              addedBy: users[0]
            }
          ]
        }, {
          title: 'my next title',
          imgUrl: 'https://i.imgur.com/3xjTHJk.jpg',
          addedBy: users[1],
          comments: []
        }
      ])
        .then(pics => {
          console.log(`Created ${pics.length} pics`);
        })
        .catch(err => console.log(err))
        .finally(() => mongoose.connection.close());
    })
    .catch(err => console.log(err));
});
