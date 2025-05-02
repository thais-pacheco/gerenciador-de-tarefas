// src/models/usuarioModel.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize'); // Importa a instância do Sequelize

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;
