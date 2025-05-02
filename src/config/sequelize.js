// src/config/sequelize.js

const { Sequelize } = require('sequelize');


require('dotenv').config(); // <-- Adicione isso no topo se ainda não tiver

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);


// Testa a conexão
async function testarConexao() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}

testarConexao();

module.exports = { sequelize };
