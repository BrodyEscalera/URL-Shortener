const logger = require('./logger');
const db = require('./db');

exports.create = (payload, err, success) => {
  db.url.create(payload).then(success).catch(err);
    logger.debug('Creating record in database | models/urlMethods.js');
};
//this model handles searching the database for all available objects
exports.findAll = ( err, success) => {
  db.url.findAll().then(success).catch(err);
    logger.debug('Finding all records in database - return all records | models/urlMethods.js');
};
//this model handels returning a specific object from the datbase
exports.find = ( payload, err, success) => {
    db.url.find({
        where:{
            id: payload.id,
        },
        include:[{
            all:true,
            nested:true,
        }],
    }).then(success).catch(err);
    logger.debug('Finding specified record in database - return record | models/urlMethods.js');
};


//this model looks up an object by the provided mini link and returns the original link
exports.go = ( payload, err, success) => {
    db.url.find({
        where:{
            shortUrl: payload.shortUrl,
        },
        include:[{
            all:true,
            nested:true,
        }],

    }).then(success).catch(err);
    logger.debug('Finding specific record in database - return property: shortUrl  | models/urlMethods.js');
};
//this model deletes an object based on a specific id
exports.destroy = ( payload, err, success) => {
    db.url.destroy({
        where:{
            id: payload.id,
        },

    }).then(success).catch(err);
    logger.debug('Deleting specific record in database - return 1 = success/ 0 = fail  | models/urlMethods.js');
};
//this model handles updating a specific item in the database based o id
exports.update = ( payload, err, success) => {
    db.url.find({
        where:{
            id: payload.id,
        },

    }).then(function (existingData){
        existingData.updateAttributes(payload).then(success).catch(err)
    }).catch(err);
    logger.debug('Updating specific record in database - return updated record  | models/urlMethods.js');
};