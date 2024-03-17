// models/Caretaker.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Caretaker = sequelize.define('Caretaker', {
  "idCare taker": {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(60), // Assuming you'll hash the passwords
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'full name', // Map to the column name in the database
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  working_Area: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'working_Area', // Map to the column name in the database
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speciality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CIN: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verification: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'caretaker', // Specify the actual table name
  timestamps: false, // Set to true if you have createdAt and updatedAt fields
});

module.exports = Caretaker;
