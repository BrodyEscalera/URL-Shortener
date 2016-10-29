const express = require('express'); //This requires the express module and sets to variable
const body_parser = require('body-parser'); //this requires the body_parser module and sets to variable
const app = express()
const port = process.env.PORT || 3000; //this sets the active port for the server


app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended:true,
}));

// app.use('/api', require('../routes/api.js')(express));// this sets the base of the URL to /api/v1 and passes express to the route.

app.use('/api', require('../routes/api/url.js')(express));



exports.server = app.listen(port, function() { // this listens for the server to activate and prints to the terminal
    console.log('Server Active on', port);
});

// module.exports = server;// this exports the server for testing. this line was replaced by prepending exports to the server variable above.