require('dotenv').config(); // Carregar variáveis de ambiente

const { Sequelize } = require('sequelize');

// Verificar se as variáveis de ambiente estão sendo carregadas corretamente
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('HOST:', process.env.HOST);
console.log('DB_DIALECT:', process.env.DB_DIALECT);
console.log('DB_PORT:', process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

sequelize.authenticate()
  .then(function() {
    console.log("Conectado ao banco de dados 🚀");
  })
  .catch(function(err) {
    console.log("Erro na conexão: " + err);
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
}
