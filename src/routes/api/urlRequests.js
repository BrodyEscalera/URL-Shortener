/**
 * Created by Brody on 10/29/16.
 */
const logger = require ('../../models/debugUtility');
const url = require('../../models/urlMethods');
const path    = require("path");
const jData = ' | Json data returned';
const randomizer = require('../../models/urlRandomizer');
module.exports = function(express) {
    const router = express.Router();

    //Checks for post via URL in browser or via postman --captures link and generates random link
    router.post('/url', function (req, res) {
        logger.debug('router.post /url | urlMethods.js');
        var random = randomizer(5); //This generates the random url with 5 alpha numeric characters.
        var link;

        if(req.body.link == null){
            link = req.params.link;
            logger.debug('key value pair data posted /url/?link='+ link);
        }else{

            link = req.body.link;
            logger.debug('json data posted, link:"' + link+'"');
        }
        var generated = {link:link,shortUrl:"min."+random};
        logger.debug('POST request to /url'+jData );

        // res.json({link:link});
        url.create(generated, function(err){
            res.status(500).json(err);
            logger.err('error - router.post /url | urlMethods.js');

        }, function(data){

            res.status(200).json(data);
        })

    });

    //loads default page for the baseline GUI
    router.get('/url', function (req, res) {
        logger.debug('router.get /url | urlMethods.js');
        res.sendFile(path.join(__dirname+'/views/index.html'));
        logger.debug('GET request for /url - index.html served');

    });
    //returns all available objects from database
    router.get('/urls', function (req, res) {
        logger.debug('router.get /urls | urlMethods.js');
        url.findAll(req.body, function (err) {

            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        });
        logger.debug('GET request for /urls'+ jData);

    });
    //returns object by a specific Id
    router.get('/url/:id', function (req, res) {
        logger.debug('router.get /url:id | urlMethods.js');
        req.body.id = req.params.id;
        url.find(req.body, function (err) {
            logger.err('error - router.get /url:id | urlMethods.js');
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        });
        logger.debug('GET request for /url/:id, id = '+req.body.id+ jData);

    });
    //updates object by a specific id
    router.post('/url/:id', function (req, res) {
        logger.debug('router.post /url:id | urlMethods.js');
        req.body.id = req.params.id;
        url.update(req.body, function (err) {
            res.status(500).json(err);
            logger.err('error - router.post /url:id | urlMethods.js');
        }, function (data) {
            res.status(200).json(data);
        });
        logger.debug('POST request for /url/:id, id = '+req.body.id+ jData);
    });
    //deletes an object by a specific id
    router.delete('/url/:id', function (req, res) {
        logger.debug('router.delete /url:id | urlMethods.js');
        req.body.id = req.params.id;
        url.destroy(req.body, function (err) {
            logger.err('error - router.delete /url:id | urlMethods.js');
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        })
        logger.debug('DELETED record from database, id = '+req.body.id);
    });
    //redirects to URL based on mini url provided
    router.get('/url/go/:shortUrl', function (req, res) {
        logger.debug('router.get /url/go/:shortUrl | urlMethods.js');
        req.body.shortUrl = req.params.shortUrl;
        url.go(req.body, function (err) {
            logger.err('error - router.get /url/go/:shortUrl | urlMethods.js');
            res.status(500).json(err);
        }, function (data) {
            //res.status(200).json(data.link);
            res.redirect('http://'+data.link );
            logger.debug('Redirect from database record '+data.id+' | '+data.shortUrl+' > '+ data.link);
        });

    });

    return router;
};



