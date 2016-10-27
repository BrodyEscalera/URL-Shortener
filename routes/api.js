module.exports = function(express){   //this imports the Express module which gives us access to the router function
var router = express.Router(); //this sets the variable router to an instance of the Router function

    router.get('/*', function (req, res) { //This gets the URL header from the browser for anything after the / using the * as a wildcard identifier.
        console.log('test');
        var random = (Math.random()*1e32).toString(36).slice(15); //This creates a random string to send to the body as JSON data. Currently I have the slice  function in here to reduce the size of the URL displayed.
        res.json({URLLink:'http://'+ random}) ;//This returns the JSON data to the browser
    });

    router.get('/browserStat', function (req, res) { //This is an additional route that is not being used.
        res.json({healthy:true}) ; //This returns JSON data to browser
    });

return router; //this returns the router to the server.js
};