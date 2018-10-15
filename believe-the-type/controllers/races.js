const Race = require('../models/race');
const rp = require('request-promise');
const { goodReadsApiKey } = require('../config/environment');

function lastCharacter(string) {
  return string[string.length - 1];
}

function randomQuote() {
  // Get an author's books
  return rp.get({
    url: 'https://www.goodreads.com/search/index.xml?key=FSLDKVm4HKata2lDB4kvg&q=Ender%27s+Game',
    qs: {
      q: 'Rudyard Kipling',
      key: goodReadsApiKey
    },
    json: true
  })
    .then(quote => {
      console.log('quote is', quote);
      // quote.quoteText = quote.quoteText.trim();
      // if (lastCharacter(quote.quoteText) !== '.') {
      //   quote.quoteText += '.';
      // }
      // return quote;
    });
}

function create(req, res, next) {
  randomQuote()
    .then(quotes => {
      console.log('quotes is ', quotes);
      req.body.text = quotes.quoteText;
      req.body.quoteAuthor = quotes.quoteAuthor;
      return Race.create(req.body);
    })
    .then(race => res.json(race))
    .catch(next);
}

function index(req, res, next) {
  Race.find()
    .then(races => res.json(races))
    .catch(next);
}

function show(req, res, next) {
  Race.findById(req.params.id)
    .then(race => res.json(race))
    .catch(next);
}

module.exports = {
  create, index, show
};
