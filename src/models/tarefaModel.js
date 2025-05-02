const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const Status = require('./statusModel');
const Usuario = require ('./usuarioModel.js');


const Tarefa = sequelize.define('tarefa', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'status',
      key: 'id',
    },
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', 
      key: 'id',
    },
  },
}, {
  tableName: 'tarefa',
  timestamps: false,
});

// Associação (foreign key)
Tarefa.belongsTo(Status, {
  foreignKey: 'status_id',
  as: 'status',
});

Tarefa.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario',
});

Status.hasMany(Tarefa, {
  foreignKey: 'status_id',
  as: 'tarefas',
});

Usuario.hasMany(Tarefa, {
  foreignKey: 'usuario_id',
  as: 'tarefas',
});


module.exports = Tarefa;
