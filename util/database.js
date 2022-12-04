const Sequelize= require('sequelize');

const sequelize= new Sequelize('expensetrekker', 'root', 'vidmate', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports=sequelize;