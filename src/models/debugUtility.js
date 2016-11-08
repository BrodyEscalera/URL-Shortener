const fs = require('fs');// default file system cont module in node.js

const debugKey = process.env.DEBUG; // this variable is set to the
// environmental DEBUG variable in the .env file.
const filepath = 'src/logs/all-logs.log';

/** The logger function
creates an object with the functions err, warn, and debug, Each one of these
functions sets the color & tags the log with the appropriate level. If the
trigger and environmental are true and 0 than the errors will print to the terminal
if the trigger and DEBUG variable are set to 1 and anything other than true,
the logs will be appended to the all-logs file in the logs directory.
 **/

const logger = function JSClass(cont) {
  /** The "use strict" diretive is necessary because Block-scoped declarations
     (let, const, function, class) not yet supported outside strict mode **/

  'use strict';

  const sep = ':';
  const clear = '\x1B[0m';// ansi value formats the text color to default

  let option;/* this variable is set based on the if statement below.
  It can either print to the terminal or save to a file.*/
  let trigger;// this variable is set based on the env DEBUG variable.
  /** This conditional staement sets the option variable in the logger function
  equal to either console.log or append.file. **/
  if (debugKey === 'true') {
    trigger = 0;
    option = (a) => { // sets option equal to console.log
      console.log(a);
    };
  } else {
    trigger = 1;
    option = (a) => {
      const timeStamp = new Date().toISOString(); // this gets the time and formats
      // it into a readable format.
      const front = '{';
      const sep2 = ',';
      const end = '}';
      const data = front + timeStamp + sep2 + a + end; // these variables format
      // the data saved into the log file.
      fs.appendFile(filepath, data, (err) => { // this function adds the data
        // to the log file instead of
              // overwriting. if a file doesn't exist, this will create one.
        if (err) throw err;
      });
    };
    console.log('Application Version: ' + process.env.Version);
  }

/** This method is used to log errors in this application **/
  this.err = (container) => {
    const color = '\x1B[31m'; // ansi value formats the text color to red
    const tag = 'Error!: ';
    const message = container;
    if (trigger === 0) {
      option(color + tag + message + clear);
    } else if (trigger === 1) {
      option(tag + sep + cont);
    }
  };
/** This method is used to log debugs and replases console.logs in this application **/
  this.debug = (container) => {
    const color = '\x1B[34m'; // ansi value formats the text color to blue
    const tag = 'Debug';
    const message = container;
    if (trigger === 0) {
      option(color + tag + clear + sep + message);
    } else if (trigger === 1) {
      option(tag + sep + cont);
    }
  };
/** This method is used to log warnings in this application **/
  this.warn = (container) => {
    const color = '\x1B[41m\x1B[33m'; // ansi value formats the text color to yellow with red background
    const tag = ' Warning ';
    const message = container;
    if (trigger === 0) {
      option(color + tag + clear + sep + message);
    } else if (trigger === 1) {
      option(tag + sep + cont);
    }
  };

  this.log = (container) => {
    const message = container;
    console.log(message);
  };
};


/** This creates a version of logger and exports it to the application **/
const debugUtility = new logger();
module.exports = debugUtility;
