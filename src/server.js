const express = require('express'); // This requires the express module and sets to variable
const bodyParser = require('body-parser'); // this requires the body_parser module and sets to variable


const app = express();
const port = process.env.DB_PORT || 3000; // this sets the active port for the server
require('dotenv').config();
const logger = require('./models/debugUtility');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// this sets the base of the URL to /api/v1 and passes express to the route.

app.use('/api/v3', require('./routes/api/urlRequests.js')(express));
// this listens for the server to activate and prints to the terminal
const server = app.listen(port, () => {
  logger.log('Server Active on port:', port);
});

logger.debug('Environmental Debug Variable set to: ' + process.env.DEBUG);
module.exports = app;

// this is a test
module.exports = server;
// this exports the server for testing. this line was replaced by prepending
// exports to the server variable above.
