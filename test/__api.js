

'use strict'

const dotenv = require('dotenv').config();
const request = require('supertest');// this reuires the supertest module and sets to a variable
const chai = require('chai');
const db = require('../src/models/db');
const async = require('async')
const expect = chai.expect;

describe('API route Tests', () => { // this runs through each available route within the server and tests the output.
  let server; // imports the server model.
  let urlId
  let testObjectId
  const testData = { id: testObjectId, link: 'www.testlink.com', testId: 'MOD' };


  beforeEach(() => { // opens the server for each route and then closes.
    db.url.findOrCreate({
      where: {
        link: 'localhost:3000/api/v3/url',
        shortUrl: 'min.test',
        testId: 'TEST',
      },
    })
     .spread((url) => {
         testObjectId = (url.get({
         plain: true,
       }).id);
     });
    server = require('../src/server');
    console.log(testObjectId)
  });

   afterEach(() => {
     server.close();
   });

  const endPointsArray = [
    {
      testName: '/ should post test object to the url generated in the test',
      endPointRoute: '/api/v3/url/',
      acceptedDataType: 'application/json',
      expectedUrl: urlId,
      requestType: 'post',
      statusCode: 200,
      expectedProperties: ['id', 'link', 'shortUrl'],
      postMessage: testData,
      expectedContentType: 'application/json; charset=utf-8',
    },

    {
      testName: '/ should return full json database',
      endPointRoute: '/api/v3/urls',
      acceptedDataType: 'application/json',
      requestType: 'getAll',
      statusCode: 200,
      expectedProperties: ['id', 'link', 'shortUrl'],
      expectedContentType: /json/,
    },

    {
      testName: '/url should return the index.js html page',
      endPointRoute: '/api/v3/url',
      requestType: 'get',
      acceptedDataType: 'text/html',
      statusCode: 200,
      expectedContentType: 'text/html; charset=UTF-8',
    },

    {
      testName: '/ should return redirected to link html',
      endPointRoute: '/api/v3/url/go/min.test',
      acceptedDataType: 'text/html',
      requestType: 'get',
      statusCode: 200,
      // expectedProperties: '',
      expectedContentType: 'text/html; charset=utf-8',
    },
    // {
    //   testName: '/ should return specified database object by :id with properties of id, link , shorturl',
    //   endPointRoute: '/api/v3/url/' + testObjectId,
    //   expectedUrlId: '',
    //   acceptedDataType: 'application/json',
    //   requestType: 'get',
    //   statusCode: 200,
    //   expectedProperties: ['id', 'link', 'shortUrl'],
    //   expectedContentType: /json/,
    // },

    //this last item is for the delete function need to refactor to use a
    //test object generated here.
    // {
    //   testName: '/ should return delete from the database to the url',
    //   endPointRoute: '/api/v3/url/' + testObjectId,
    //   expectedUrl: '',
    //   requestType: 'delete',
    //   expectedProperties: ['id', 'shortUrl'],
    //   postMessage: 'delete',
    //   expectedContentType: 'application/json; charset=utf-8',
    // },
  ];
  if (testObjectId !== null) {
  for (const routeEndPointIndex in endPointsArray) {
    it(endPointsArray[routeEndPointIndex].testName, (done) => { // specific tests
      if (endPointsArray[routeEndPointIndex].requestType === 'get') {
      async.series([ ()=>{ request(server) // .end(done) on request object
              .get(endPointsArray[routeEndPointIndex].endPointRoute)
              .set('Accept', endPointsArray[routeEndPointIndex].acceptedDataType)
              .expect('Content-Type', endPointsArray[routeEndPointIndex].expectedContentType)
              .expect((res) => {
                if (endPointsArray[routeEndPointIndex].acceptedDataType === 'application/json') {
                for (const expectedPropertyIndex in endPointsArray[routeEndPointIndex]
                  .expectedProperties) {
                  expect(res.body).to.have.property(endPointsArray[routeEndPointIndex]
                    .expectedProperties[expectedPropertyIndex]);
                }// end for
                } else {
                  expect(200, done);
                } // end if
              })
              .end((err) => {
                if (err) {
                  return done(err)
                }
              })}]);

      } else if (endPointsArray[routeEndPointIndex].requestType === 'getAll') {
        async.series([ ()=>{request(server) // .end(done) on request object
        .get(endPointsArray[routeEndPointIndex].endPointRoute)
        .set('Accept', 'application/json')
        .expect('Content-Type', endPointsArray[routeEndPointIndex].expectedContentType)
        .expect((res) => {
          for(const expectedArrayIndex in res.body) {
          for (const expectedIndex in endPointsArray[routeEndPointIndex].expectedProperties) {
            expect(res.body[expectedArrayIndex]).to.have.property(endPointsArray[routeEndPointIndex]
              .expectedProperties[expectedIndex]);
          }
          }
        })
        .end((err) => {
          if (err) {
            return done(err);
          }
        })}]);
      } else if (endPointsArray[routeEndPointIndex].requestType === 'post') {
        async.series([ ()=>{request(server) // .end(done) on request object
                .post(endPointsArray[routeEndPointIndex].endPointRoute)
                .send(endPointsArray[routeEndPointIndex].postMessage)
                .set('Accept', 'application/json')
                .expect('Content-Type', endPointsArray[routeEndPointIndex].expectedContentType)
                .expect((res) => {
                  if (endPointsArray[routeEndPointIndex].acceptedDataType === 'application/json') {
                  for (const expectedPropertyIndex in endPointsArray[routeEndPointIndex]
                    .expectedProperties) {
                    expect(res.body).to.have.property(endPointsArray[routeEndPointIndex]
                      .expectedProperties[expectedPropertyIndex]);
                  }// end for
                  } else {
                    expect(200, done);
                  } // end if
                })
                .end((err) => {
                  if (err) {
                    return done(err);
                  }
                })}]);
      }else if (endPointsArray[routeEndPointIndex].requestType === 'delete') {
        async.series([ ()=>{request(server) // .end(done) on request object
                .delete(endPointsArray[routeEndPointIndex].endPointRoute)
                .set('Accept', 'application/json')
                .expect('Content-Type', endPointsArray[routeEndPointIndex].expectedContentType)
                .expect((res) => {
                  if (endPointsArray[routeEndPointIndex].acceptedDataType === 'application/json') {
                  for (const expectedPropertyIndex in endPointsArray[routeEndPointIndex]
                    .expectedProperties) {
                    expect(res.body).to.have.property(endPointsArray[routeEndPointIndex]
                      .expectedProperties[expectedPropertyIndex]);
                  }// end for
                  } else {
                    expect(200, done);
                  } // end if
                })
                .end((err) => {
                  if (err) {
                    return done(err);
                  }
                })}]);
      }
     done()
    });
  }
  }
  after(() => {
    db.url.destroy({
      where: {
        testId: 'TEST',
      },
    });
    db.url.destroy({
      where: {
        link: null,
      },
    });
  });
});
