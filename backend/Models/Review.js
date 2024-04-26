// models/Review.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
// models/Review.js
const Review = sequelize.define('Review', {
  idReview: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  numberOfStars: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  "idCare taker": {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Caretaker', 
      key: 'idCare taker'
    },
    field: 'idCare taker'
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'idUser'
    }
  },
  reviewDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'review',
  timestamps: false
});


module.exports = Review;
