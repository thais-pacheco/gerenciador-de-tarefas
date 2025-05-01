const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gerenciamento_tarefas', 'root', '997498896', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  } 
})();

module.exports = sequelize;
