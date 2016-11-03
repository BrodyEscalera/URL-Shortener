/**
 * Created by Brody on 10/29/16.
 */
const logger = require ('../../models/logger');
const url = require('../../models/url');
const path    = require("path");

module.exports = function(express) {
    const router = express.Router();

    //Checks for post via URL in browser or via postman --captures link and generates random link
    router.post('/url', function (req, res) {
        var random = (Math.random()*1e32).toString(36).slice(15);
        var link;

        if(req.body.link == null){
            link = req.param('link');
        }else{

            link = req.body.link
        }
        var generated = {link:link,shortUrl:"min."+random};
        logger.debug('POST request to /url recieved, router.post method in url.js', generated );

        // res.json({link:link});
        url.create(generated, function(err){
            res.status(500).json(err);

        }, function(data){

            res.status(200).json(data);
        })

    });

    //loads default page for the baseline GUI
    router.get('/url', function (req, res) {
        res.sendFile(path.join(__dirname+'/views/index.html'));
        logger.debug('GET request for /url');

    });
    //returns all available objects from database
    router.get('/urls', function (req, res) {
        url.findAll(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        })
        logger.debug('GET request for /urls');

    });
    //returns object by a specific Id
    router.get('/url/:id', function (req, res) {
        req.body.id = req.params.id;
        url.find(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        })
        logger.debug('GET request for /url/:id, id = '+req.body.id);

    });
    //updates object by a specific id
    router.post('/url/:id', function (req, res) {
        req.body.id = req.params.id;
        url.update(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        })
        logger.debug('POST request for /url/:id, id = '+req.body.id);
    });
    //deletes an object by a specific id
    router.delete('/url/:id', function (req, res) {
        req.body.id = req.params.id;
        url.destroy(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        })
        logger.debug('DELETED record from database, id = '+req.body.id);
    });
    //redirects to URL based on mini url provided
    router.get('/url/go/:shortUrl', function (req, res) {
        req.body.shortUrl = req.params.shortUrl;
        url.go(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            //res.status(200).json(data.link);
            res.redirect('http://'+data.link );
            logger.debug('Redirect from database record '+data.id+' | '+data.shortUrl+' > '+ data.link);
        });

    });

    return router;
};



