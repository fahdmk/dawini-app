const Sequelize = require('sequelize');

const sequelize = new Sequelize('dawini4', 'root', 'fahd', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;