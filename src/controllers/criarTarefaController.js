const Tarefa = require('../models/tarefaModel');
const Status = require('../models/statusModel');

const criarTarefa = async (req, res) => {
  try {
    const { nome, descricao, status_id } = req.body;

    const statusExiste = await Status.findByPk(status_id);
    if (!statusExiste) {
      return res.status(400).json({ erro: 'Status informado não existe.' });
    }

    const novaTarefa = await Tarefa.create({
      nome,
      descricao,
      status_id,
    });

    res.status(201).json({ mensagem: 'Tarefa criada com sucesso!', tarefa: novaTarefa });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ erro: 'Erro interno ao criar tarefa.' });
  }
};

module.exports = {
  criarTarefa,
};
