const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const fileURL= sequelize.define('FileUrls', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    File_Name: Sequelize.STRING,
    File_URL: Sequelize.STRING,
});
module.exports=fileURL;