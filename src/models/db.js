/**
 * Created by Brody on 10/29/16.
 */
    const Sequelize = require('sequelize');
    const logger = require('./debugUtility');


//this instantiates the seqelize module which aloows for acces to a mysql database
    const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
        host:process.env.DB_HOST,
        dialect:process.env.DB_SCHEMA,
        port:process.env.DB_PORT,
        pool:{
            max:5,
            min:0,
            idle:10000,

        },
        logging: false,

    });

//this creates the database and the columns within the database.
    const url = sequelize.define('url',{
        link:{
            type: Sequelize.STRING,
        },
        shortUrl: {
            type: Sequelize.STRING,
        },


    }); //defines the table


    sequelize.sync(); //syncs the database to this file.
    logger.debug('sequlaize database synced...');
exports.sequelize = sequelize;
exports.url = url;
