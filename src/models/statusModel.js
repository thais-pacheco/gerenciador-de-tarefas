const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Status = sequelize.define('status', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'status',
  timestamps: false,
});

module.exports = Status;
