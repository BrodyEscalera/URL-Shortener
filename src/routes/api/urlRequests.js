/**
 * Created by Brody on 10/29/16.
 */

const logger = require('../../models/debugUtility');
const url = require('../../models/urlMethods');
const path = require('path');

const jData = ' | Json data returned';
const randomizer = require('../../models/urlRandomizer');

module.exports = (express) => {
  const router = express.Router();

    // Checks for post via URL in browser or via postman --captures link and generates random link
  router.post('/url', (req, res) => {
/** The "use strict" diretive is necessary because Block-scoped declarations
   (let, const, function, class) not yet supported outside strict mode **/

    'use strict';

    let bodylink;

    const random = randomizer(5); // This generates the random url with 5 alpha numeric characters.
    logger.debug('router.post /url | urlMethods.js');

    if (req.body.link == null) {
      bodylink = req.query.link;
      logger.debug('key value pair data posted /url/?link=' + bodylink);
    } else {
      bodylink = req.body.link;
      logger.debug('json data posted, link:"' + bodylink + '"');
    }
    const generated = { link: bodylink, shortUrl: 'min.' + random };
    logger.debug('POST request to /url' + jData);

        // res.json({link:link});
    url.create(generated, (err) => {
      res.status(500).json(err);
      logger.err('error - router.post /url | urlMethods.js');
    }, (data) => {
      res.status(200).json(data);
    });
  });

    // loads default page for the baseline GUI
  router.get('/url', (req, res) => {
    logger.debug('router.get /url | urlMethods.js');
    res.sendFile(path.join(__dirname, '/views/index.html'));
    logger.debug('GET request for /url - index.html served');
  });
    // returns all available objects from database
  router.get('/urls', (req, res) => {
    logger.debug('router.get /urls | urlMethods.js');
    url.findAll(req.body, (err) => {
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
    logger.debug('GET request for /urls' + jData);
  });
    // returns object by a specific Id
  router.get('/url/:id', (req, res) => {
    logger.debug('router.get /url:id | urlMethods.js');
    const reqParam = req;
    reqParam.body.id = reqParam.params.id; /** The eslint rule no-param-reassign is
    irrelivent per eslint documentation "If you want to allow assignment to
    function parameters, then you can safely disable this rule."*/
    url.find(req.body, (err) => {
      logger.err('error - router.get /url:id | urlMethods.js');
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
    logger.debug('GET request for /url/:id, id = ' + req.body.id + jData);
  });
    // updates object by a specific id
  router.post('/url/:id', (req, res) => {
    const reqParam = req;
    logger.debug('router.post /url:id | urlMethods.js');
    reqParam.body.id = reqParam.params.id;/** The eslint rule no-param-reassign is
    irrelivent per eslint documentation "If you want to allow assignment to
    function parameters, then you can safely disable this rule."*/
    url.update(req.body, (err) => {
      res.status(500).json(err);
      logger.err('error - router.post /url:id | urlMethods.js');
    }, (data) => {
      res.status(200).json(data);
    });
    logger.debug('POST request for /url/:id, id = ' + req.body.id + jData);
  });
    // deletes an object by a specific id
  router.delete('/url/:id', (req, res) => {
    const reqParam = req;
    logger.debug('router.delete /url:id | urlMethods.js');
    reqParam.body.id = req.params.id;/** The eslint rule no-param-reassign is
    irrelivent per eslint documentation "If you want to allow assignment to
    function parameters, then you can safely disable this rule."*/
    url.destroy(req.body, (err) => {
      logger.err('error - router.delete /url:id | urlMethods.js');
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
    logger.debug('DELETED record from database, id = ' + req.body.id);
  });
    // redirects to URL based on mini url provided
  router.get('/url/go/:shortUrl', (req, res) => {
    const reqParam = req;
    logger.debug('router.get /url/go/:shortUrl | urlMethods.js');
    reqParam.body.shortUrl = req.params.shortUrl;/** The eslint rule no-param-reassign is
    irrelivent per eslint documentation "If you want to allow assignment to
    function parameters, then you can safely disable this rule."*/
    url.go(req.body, (err) => {
      logger.err('error - router.get /url/go/:shortUrl | urlMethods.js');
      res.status(500).json(err);
    }, (data) => {
            // res.status(200).json(data.link);
      res.status(200).redirect('http://' + data.link);
      logger.debug('Redirect from database record ' + data.id + ' | ' + data.shortUrl + ' > ' + data.link);
    });
  });

  return router;
};
