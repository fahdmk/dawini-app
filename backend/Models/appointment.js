const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config'); // adjust the path to your sequelize config

const Appointment = sequelize.define('Appointment', {
  idAppointment: {
    type: DataTypes.STRING(36),
    allowNull: false,
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
    field: 'accepted/declined' 
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  IdCareTaker: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Caretaker', 
      key: 'idCare taker', 
    },
    field: 'Care taker_idCare taker'
  },
  User_idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', 
      key: 'id',
    }
  }
}, {
  tableName: 'appointment', 
  timestamps: false, 
});

module.exports = Appointment;
