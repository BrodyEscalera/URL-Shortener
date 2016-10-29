module.exports = function(express){   //this imports the Express module which gives us access to the router function
const router = express.Router(); //this sets the variable router to an instance of the Router function
const path    = require("path");


    router.post('/v1', function (req, res) { //This gets the URL header from the browser for anything after the / using the * as a wildcard identifier.
        console.log('test', req.body);
        var random = (Math.random()*1e32).toString(36).slice(15); //This creates a random string to send to the body as JSON data. Currently I have the slice  function in here to reduce the size of the URL displayed.


        res.json({URLLink:'http://'+ random}) ;//This returns the JSON data to the browser
    });

    router.get('/v1', function (req, res) { //This route is being used to serve the default html
        res.sendFile(path.join(__dirname+'/views/index.html'));
        //__dirname : resolves to your current folder.


    });

return router; //this returns the router to the server.js
};