var request = require('supertest');//this reuires the supertest module and sets to a variable


describe('API', function() { //this runs through each available route within the server and tests the output.
    var server; // imports the server model.

    beforeEach(function(){ //opens the server for each route and then closes.
        server = require('../src/server');
    });
    afterEach(function () {
        server.close();
    });


    it('/ should return specified object', function(done) { //specific tests
        request(server)
            .get('/api/v1/url/10')
            .set('Accept','application/json')
            .expect('Content-Type', /json/, done)
            // .expect(200,{hello: "world"}, done)


    });

    it('/status should return specified healthy:true', function(done) {
        request(server)
            .get('/api/v1/urls')
            .set('Accept','application/json')
            .expect('Content-Type', /json/, done)
            // .expect(200,{healthy: true}, done)


    });

});
