var express = require('express'); //This requires the express module and sets to variable
var body_parser = require('body-parser'); //this requires the body_parser module and sets to variable
var app = express()


app.use('/api/v1', require('../routes/api.js')(express));// this sets the base of the URL to /api/v1

var port = 3000; //this sets the active port for the server

var server = app.listen(port, function(){ // this listenes for the server to activate and prints to the terminal
    console.log('Server Active on', port);
});

module.exports = server;// this exports the server for testing.