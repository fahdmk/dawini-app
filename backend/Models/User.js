// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
const Review = require('./Review');
const Appointment = require('./appointment'); // Adjust path as necessary


const User = sequelize.define('User', {
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  "online staus": {
    type: DataTypes.STRING,
  },
  Adress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Location: {
    type: DataTypes.STRING,
  },
  prefrences: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'user', // Make sure to specify the actual table name
  timestamps: false, // Set to true if you have createdAt and updatedAt fields
});
User.hasMany(Review, {
  foreignKey: 'idUser',
  as: 'Reviews' // Alias for easier identification
});
Review.belongsTo(User, {
  foreignKey: 'idUser',
  as: 'User' // Alias for easier identification
});
User.hasMany(Appointment, {
  foreignKey: 'User_idUser',
  as: 'appointments'
});
module.exports = User;
