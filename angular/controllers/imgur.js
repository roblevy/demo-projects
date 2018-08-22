const Request = require('request-promise');

function imgurSearch(req, res, next) {
  Request
    .get({
      url: 'https://api.imgur.com/3/gallery/search/top/all/1',
      qs: { q: req.params.q },
      headers: {
        Authorization: 'Client-ID 324cbe227e6cb74',
        'Content-Type': 'application/json'
      }
    })
    .then(json => {
      res.send(json);
    })
    .catch(next);
}

module.exports = {
  'search': imgurSearch
};
