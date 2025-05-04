const Tarefa = require('../models/tarefaModel');
const Status = require('../models/statusModel');

// GET - Exibir página de criação
const viewCriarTarefa = async (req, res) => {
  try {
    const statusList = await Status.findAll();
    res.render('tarefas/criarTarefas', {
      statusList,
      usuario_id: req.usuarioId
    });
  } catch (err) {
    console.error('Erro ao carregar formulário:', err);
    res.status(500).send('Erro ao carregar página de criação de tarefa.');
  }
};

// POST - Criar tarefa
const criarTarefa = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { nome, descricao } = req.body;

    // Verifica se o usuário está logado (se a sessão do usuárioId existir)
    const usuarioId = req.session.usuarioId;
    if (!usuarioId) {
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    // Cria a tarefa com o status_id 3 (Não iniciado) e o usuario_id vindo da sessão
    await Tarefa.create({
      nome,
      descricao,
      status_id: 3, // "Não iniciado"
      usuario_id: usuarioId // Associa a tarefa ao usuário logado
    });

    // Redireciona para a página de tarefas após criar a tarefa
    res.redirect('/tarefas');
  } catch (error) {
    console.error('Erro ao criar tarefa:', error.message);
    console.error(error); // Detalhes como `ValidationError` do Sequelize
    res.status(500).send('Erro interno ao criar tarefa.');
  }
};

module.exports = {
  viewCriarTarefa,
  criarTarefa
};