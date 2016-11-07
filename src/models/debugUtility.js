fs = require('fs');
var debugKey = process.env['DEBUG'];
var option;
const logger = function JSClass(package){
    var package = package
    this.err = function(package){
        option('\033[31m' + 'Error!: ' + package + '\033[0m');
    };
    this.debug = function(package){
        option('\033[34m' + 'Debug'+'\033[0m'+':'+package)
    };
    this.warn = function(package){
        option('\033[41m\033[33m' + ' Warning '+'\033[0m'+':'+package)
    };
};



if(debugKey==='true'){
    console.log('inside true');
    option = function (a){
        console.log(a);
    }
}else{
    //write to file function
    option = function (a){
        const timeStamp = new Date().toISOString()

            front = '{',
            sep=',',
            end='}',
            data = front+timeStamp+sep+a+end

        fs.appendFile('src/logs/all-logs.log', data , function (err) {
            if (err) throw err;

        });


    };
    console.log("Application Version: "+ process.env['Version']  )
}


const debugUtility = new logger();
console.log(debugKey);
module.exports = debugUtility;