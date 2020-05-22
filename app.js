// load up the express framework
const express = require('express');

// load the morgan lib for logging - dev
const log = require('morgan')('dev');

// load the properties config file
const properties = require('./config/properties');

// set the desired and backup port number for the server to run
const port = process.env.PORT || properties.PORT;

// load body-parser helper
const bodyParser = require('body-parser');

// universities routes
const universitiesRoutes = require('./api/universities.routes');

// create an instance of express to serve our end points
const app = express();

// initialise express router
const router = express.Router();

// configure logger
app.use(log);

// configure our express instance with some body-parser settings 
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});

// use express router
app.use('/api', router);

// call universities routing
universitiesRoutes(router);

// Wrong paths
app.use((req, res, next) => {
  const error = new Error("Path Not found");
  error.status = 404;
  next(error);
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port, (req, res) => {
  console.log(`Server is listening on port ${port}.`);
});