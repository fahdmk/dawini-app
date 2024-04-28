const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config'); // adjust the path to your sequelize config
const Caretaker = require('./Caretaker');
const User = require('./User');
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
      model: 'User',  // This should match the table name for the user
      key: 'idUser',   // This should match the primary key of the user
    }
  }
}, {
  tableName: 'appointment', 
  timestamps: false, 
});
Appointment.belongsTo(User, {foreignKey: 'User_idUser', as: 'Patient'});
Appointment.belongsTo(Caretaker, {foreignKey: 'IdCareTaker', as: 'Caretaker'});

User.hasMany(Appointment, {foreignKey: 'User_idUser', as: 'PatientAppointments'});
Caretaker.hasMany(Appointment, {foreignKey: 'IdCareTaker', as: 'CaretakerAppointments'});

module.exports = Appointment;
