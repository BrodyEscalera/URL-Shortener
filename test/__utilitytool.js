'use strict'
const request = require('supertest');// this reuires the supertest module and sets to a variable
const chai = require('chai');
const logger = require('../src/lib/debugUtility');
const expect = chai.expect;

describe('Debug utility tool | ', () => {


const logPointsArray = [
  {
    testName: 'Will logg error',
    functionName: logger.err,
    functionType: 'logger.err',
  },
  {
    testName: 'Will logg warn',
    functionName: logger.debug,
    functionType: 'logger.debug',
  },
  {
    testName: 'Will logg message',
    functionName: logger.log,
    functionType: 'logger.log',
  },
  {
    testName: 'Will logg Warn',
    functionName: logger.warn,
    functionType: 'logger.warn',
  },
]

for (let i = 0; i < logPointsArray.length; i++) {
  it(logPointsArray[i].testName, (done) => {
      logPointsArray[i].functionName('This is a '+ logPointsArray[i].functionType + ' test')
 done()
});
}
})
