// models/Caretaker.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
const Review = require('./Review');
const Appointment = require('./appointment'); // Adjust path as necessary


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
    type: DataTypes.STRING(60), 
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'full name', 
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
  latitude: {
    type: DataTypes.DECIMAL(10, 8), 
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8), 
    allowNull: true,
  },
  photo_uri: { // Add this new line for the photo URI
    type: DataTypes.STRING(255), // Set an appropriate length for URIs
    allowNull: true, // Set to false if you require every caretaker to have a photo URI
  },
}, {
  tableName: 'caretaker', // Specify the actual table name
  timestamps: false, // Set to true if you have createdAt and updatedAt fields
});
Caretaker.hasMany(Review, {
  foreignKey: 'idCare taker', 
  as: 'reviews'
});
Caretaker.hasMany(Appointment, {
  foreignKey: 'Caretaker_idCaretaker',
  as: 'appointments'
});
Review.belongsTo(Caretaker, {
  foreignKey: 'idCare taker',
  as: 'Caretaker' 
});
module.exports = Caretaker;
