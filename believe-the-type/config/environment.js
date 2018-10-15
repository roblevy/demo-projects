const port = process.env.PORT || 4000;
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/believe-the-type';
const secret = process.env.SECRET || 'believe the type';
const goodReadsApiKey = process.env.GOODREADS_API_KEY;

module.exports = {
  port, dbUri, secret, goodReadsApiKey
};
