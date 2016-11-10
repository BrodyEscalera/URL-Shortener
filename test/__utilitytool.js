//
//
// 'use strict'
// const request = require('supertest');// this reuires the supertest module and sets to a variable
// const chai = require('chai');
//
// const expect = chai.expect;
//
// const exampleData = { id: '220', link: 'www.google.com', shortUrl: 'min.test' };
// describe('API route Tests', () => { // this runs through each available route within the server and tests the output.
//   let server; // imports the server model.
//
//   beforeEach(() => { // opens the server for each route and then closes.
//     server = require('../src/server');
//   });
//   afterEach(() => {
//
//     server.close();
//   });
//
//   const endPointsData = [{
//     testName: '/ should return post object to the url',
//     endPointRoute: '/api/v1/url/224',
//     requestType: 'post',
//     statusCode: 200,
//     expectedProperties: ['id', 'link', 'shortUrl'],
//     postMessage: exampleData,
//     expectedContentType: 'text/html; charset=utf-8',
//   },
//     {
//       testName: '/ should return specified database object by :id with porperties of id, link , shorturl',
//       endPointRoute: '/api/v3/url/224',
//       requestType: 'get',
//       statusCode: 200,
//       expectedProperties: ['id', 'link', 'shortUrl'],
//       expectedContentType: /json/,
//     },
//     {
//       testName: '/ should return html',
//       endPointRoute: '/api/v3/url',
//       requestType: 'get',
//       statusCode: 200,
//       expectedProperties: '',
//       expectedContentType: 'text/html; charset=UTF-8',
//     },
//     {
//       testName: '/ should return full json database',
//       endPointRoute: '/api/v3/urls',
//       requestType: 'getAll',
//       statusCode: 200,
//       expectedProperties: ['id', 'link', 'shortUrl'],
//       expectedContentType: /json/,
//     },
//     {
//       testName: '/ should return redirected to link html',
//       endPointRoute: '/api/v3/url/go/min.esfv1',
//       requestType: 'get',
//       statusCode: 200,
//       // expectedProperties: '',
//       expectedContentType: 'application/json; charset=utf-8',
//     },
//     {
//       testName: '/ should return post to the url',
//       endPointRoute: '/api/v3/url',
//       requestType: 'post',
//       statusCode: 200,
//       expectedProperties: ['id', 'shortUrl'],
//       postMessage: '?link=www.google.com',
//       expectedContentType: 'application/json; charset=utf-8',
//     },
//     // {
//     //   testName: '/ should return delete from the database to the url',
//     //   endPointRoute: '/api/v1/url/2',
//     //   requestType: 'delete',
//     //   expectedProperties: ['id', 'shortUrl'],
//     //   postMessage: exampleData.link,
//     //   expectedContentType: 'application/json; charset=utf-8',
//     // },
//   ];
//
//   for (const routeEndPointIndex in endPointsData) {
//     it(endPointsData[routeEndPointIndex].testName, (done) => { // specific tests
//       console.log('this is the entry point')
//       if (endPointsData[routeEndPointIndex].requestType === 'get'){
//       request(server) // .end(done) on request object
//               .get(endPointsData[routeEndPointIndex].endPointRoute)
//               .set('Accept', 'application/json')
//               .expect('Content-Type',endPointsData[routeEndPointIndex].expectedContentType)
//               .expect((res) => {
//                   console.log('this is the request')
//                 for (const expectedIndex in endPointsData[routeEndPointIndex].expectedProperties) {
//                   expect(res.body).to.have.property(endPointsData[routeEndPointIndex]
//                     .expectedProperties[expectedIndex]);
//                 }
//                 console.log(res.body)
//               })
//               .expect(endPointsData[routeEndPointIndex].statusCode)
//               .end(done);
//       } else if (endPointsData[routeEndPointIndex].requestType === 'post'){
//         request(server) // .end(done) on request object
//                 .post(endPointsData[routeEndPointIndex].endPointRoute)
//                 // .send(endPointsData[routeEndPointIndex].postMessage)
//                 .set('Accept', 'application/json')
//                 .expect('Content-Type',endPointsData[routeEndPointIndex].expectedContentType)
//                 .expect((res) => {
//                     console.log('this is the request')
//                   for (const expectedIndex in endPointsData[routeEndPointIndex].expectedProperties) {
//                     expect(res.body).to.have.property(endPointsData[routeEndPointIndex]
//                       .expectedProperties[expectedIndex]);
//                   }
//                   console.log(res.body)
//                 })
//                 .end(done);
//       } else if (endPointsData[routeEndPointIndex].requestType === 'delete'){
//         request(server) // .end(done) on request object
//                 .delete(endPointsData[routeEndPointIndex].endPointRoute)
//                 .set('Accept', 'application/json')
//                 .expect('Content-Type',endPointsData[routeEndPointIndex].expectedContentType)
//                 .expect((res) => {
//                     console.log('this is the request')
//                     expect(res.body).to.equal(1);
//                   console.log(res.body)
//                 })
//                 .end(done);
//       }else if (endPointsData[routeEndPointIndex].requestType === 'getAll'){
//               request(server) // .end(done) on request object
//               .get(endPointsData[routeEndPointIndex].endPointRoute)
//               .set('Accept', 'application/json')
//               .expect('Content-Type',endPointsData[routeEndPointIndex].expectedContentType)
//               .expect((res) => {
//                   console.log('this is the request')
//                 for(const expectedArrayIndex in res.body) {
//                 for (const expectedIndex in endPointsData[routeEndPointIndex].expectedProperties) {
//                   expect(res.body[expectedArrayIndex]).to.have.property(endPointsData[routeEndPointIndex]
//                     .expectedProperties[expectedIndex]);
//                 }
//               }
//                 console.log(res.body)
//               })
//                   .end(done);
//       }
//     });
// }
// });
