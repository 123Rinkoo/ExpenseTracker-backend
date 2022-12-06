const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Expense= sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Expense_Amount: Sequelize.INTEGER,
    Description: Sequelize.STRING,
    Category: Sequelize.STRING
});
module.exports=Expense;