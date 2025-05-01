const Tarefa = require('../models/tarefaModel');
const Status = require('../models/statusModel');

const listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll({
      include: {
        model: Status,
        as: 'status',
      },
    });

    res.status(200).json(tarefas);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ erro: 'Erro ao buscar tarefas' });
  }
};

module.exports = {
  listarTarefas,
};
