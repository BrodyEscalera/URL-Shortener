var winston = require('winston');
winston.emitErrs = true;
var logger = new winston.Logger();
var debugKey = process.env['DEBUG'];


if (debugKey == 'true') {
    logger.add(winston.transports.File, {
        level: 'debug',
        filename: './logs/debug.log',
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: true });

    logger.add(winston.transports.Console, {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    });


}
else {

    console.log("Application Version: "+ process.env['Version']  )
}


module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};