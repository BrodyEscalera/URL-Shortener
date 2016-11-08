fs = require('fs');//default file system cont module in node.js
var debugKey = process.env['DEBUG'];  //this variable is set to the environmental DEBUG variable in the .env file.
var option; //this variable is set based on the if statement below. It can either print to the terminal or save to a file.
var trigger; // this variable is set based on the env DEBUG variable.
var filepath ='src/logs/all-logs.log'


/**
 The logger function
 creates an object with the functions err, warn, and debug, Each one of these functions sets the color & tags the log
 with the appropriate level. If the trigger and environmental are true and 0 than the errors will print to the terminal
 if the trigger and DEBUG variable are set to 1 and anything other than true, the logs will be appended to the all-logs
 file in the logs directory.
 **/

const logger = function JSClass(cont){

    var sep = ':',
        clear = '\033[0m';//ansi value formats the text color to default

/** This method is used to log errors in this application **/
    this.err = function(cont){
        var color = '\033[31m', //ansi value formats the text color to red
            tag = 'Error!: ';
        if (trigger ===0) {
            option(color + tag + cont + clear);
        }else if (trigger ===1){
            option(tag+sep+cont)
        }
    };
/** This method is used to log debugs and replases console.logs in this application **/
    this.debug = function(cont){
        var color = '\033[34m', //ansi value formats the text color to blue
            tag = 'Debug';
        if (trigger ===0) {
            option(color+tag+clear+sep+cont);
        }else if (trigger ===1){
            option(tag+sep+cont)
        }
    };
/** This method is used to log warnings in this application **/
    this.warn = function(cont){
        var color = '\033[41m\033[33m',//ansi value formats the text color to yellow with red background
            tag = ' Warning ';
        if (trigger ===0) {
            option(color + tag +clear+sep+cont);
        }else if (trigger ===1){
            option(tag+sep+cont)
        }

    };

    this.log = function(cont){
        console.log(cont);

    };
};


/** This conditional staement sets the option variable in the logger function equal to either console.log or
 append.file. **/
if(debugKey==='true'){
    trigger = 0;
    option = function (a){//sets option equal to console.log
        console.log(a);
    }
}else{
    trigger = 1;
    option = function (a){

        const timeStamp = new Date().toISOString() //this gets the time and formats it into a readable format.

            front = '{',
            sep=',',
            end='}',
            data = front+timeStamp+sep+a+end;//these variables format the data saved into the log file.

        fs.appendFile(filepath, data , function (err) { //this function adds the data to the log file instead of
            // overwriting. if a file doesn't exist, this will create one.
            if (err) throw err;

        });


    };
    console.log("Application Version: "+ process.env['Version']  )
}

/** This creates a version of logger and exports it to the application **/
const debugUtility = new logger();
module.exports = debugUtility;
