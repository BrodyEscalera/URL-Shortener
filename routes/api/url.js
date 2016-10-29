/**
 * Created by Brody on 10/29/16.
 */

const url = require('../../models/url');

module.exports = function(express) {
    const router = express.Router();

    router.post('/url', function (req, res) {
        // console.log('test', req.body);
        // res.json({Posted: 'posted'});
        url.create(req.body, function(err){
            res.status(500).json(err);
        }, function(data){
            res.status(200).json(data);
        })
    });

    router.get('/url', function (req, res) {
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

    // router.post('/url/:id', function (req, res) {
    //     req.body.id = req.params.id;
    //     url.update(req.body, function (err) {
    //         res.status(500).json(err);
    //     }, function (data) {
    //         res.status(200).json(data);
    //     })
    //
    // });

    router.delete('/url/:id', function (req, res) {
        req.body.id = req.params.id;
        url.destroy(req.body, function (err) {
            res.status(500).json(err);
        }, function (data) {
            res.status(200).json(data);
        })

    });
    return router;
};



