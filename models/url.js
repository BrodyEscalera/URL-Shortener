const logger = require('./logger');
const db = require('./db');

exports.create = (payload, err, success) => {
  db.url.create(payload).then(success).catch(err);

}
//this model handles searching the database for all available objects
exports.findAll = ( err, success) => {
  db.url.findAll().then(success).catch(err);
}
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
}


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
}
//this model deletes an object based on a specific id
exports.destroy = ( payload, err, success) => {
    db.url.destroy({
        where:{
            id: payload.id,
        },

    }).then(success).catch(err);
}
//this model handles updating a specific item in the database based o id
exports.update = ( payload, err, success) => {
    db.url.find({
        where:{
            id: payload.id,
        },

    }).then(function (existingData){
        existingData.updateAttributes(payload).then(success).catch(err)
    }).catch(err);
}