const express = require('express');
const app = express();
const { port, dbUri } = require('./config/environment');

// Middleware
const bodyParser = require('body-parser');
const morgan = require('morgan');
app.use(bodyParser.json());
app.use(morgan('dev'));

// Mongoose
const mongoose = require('mongoose');
mongoose.connect(dbUri, { useNewUrlParser: true });

// Routing
app.use(express.static(`${__dirname}/public`));
const router = require('./config/routes');
app.use('/api', router);
app.use('*', (req, res) => res.status(401).json({message: 'Unauthorized'}));


app.listen(port, () => console.log(`Express is listening on port ${port}`));
