const port = process.env.PORT || 4000;
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/believe-the-type';

module.exports = {
  port, dbUri
};
