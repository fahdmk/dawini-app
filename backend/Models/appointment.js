const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config'); // adjust the path to your sequelize config

const Appointment = sequelize.define('Appointment', {
  idAppointment: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Price: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Date: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'accepted/declined' // Ensure this matches your database schema if using snake_case
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  IdCareTaker: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Caretaker', // This should match the model name if set in Sequelize or the table name
      key: 'idCare taker', // This must match the exact primary key name in the Caretaker model or table
    },
    field: 'Care taker_idCare taker' // The actual column name in the database
  },
  User_idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', // name of Target model
      key: 'id', // key in Target model
    }
  }
}, {
  tableName: 'appointment', // specify the table name
  timestamps: false, // set to true if you have createdAt and updatedAt fields
});

module.exports = Appointment;
