/**
 * Created by Brody on 10/29/16.
 */

const url = require('../../models/url');

module.exports = function(express) {
    const router = express.Router();

    router.post('/url', function (req, res) {
        var random = (Math.random()*1e32).toString(36).slice(15);
        var mini = ("http://'"+random);
        console.log('test', req.body + mini);
        var generated = {link:req.body.link,shortUrl:"min."+random};
        // res.json(generated)
        url.create(generated, function(err){
            res.status(500).json(err);
        }, function(data){
            res.status(200).json(data);
        })
    });

    router.get('/urls', function (req, res) {
        url.findAll(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        })

    });

    router.get('/url/:id', function (req, res) {
        req.body.id = req.params.id;
        url.find(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        })

    });

    router.post('/url/:id', function (req, res) {
        req.body.id = req.params.id;
        url.update(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        })

    });

    router.delete('/url/:id', function (req, res) {
        req.body.id = req.params.id;
        url.destroy(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        })

    });

    router.get('/url/go/:shortUrl', function (req, res) {
        req.body.shortUrl = req.params.shortUrl;
        // res.json(req.body);
        // res.json(req.params);

        url.go(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            //res.status(200).json(data.link);
            res.redirect('http://'+data.link );

        })

    });

    return router;
};



