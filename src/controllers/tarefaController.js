const Tarefa = require('../models/tarefaModel');
const Status = require('../models/statusModel');

const listarTarefas = async (req, res) => {
  try {
    const tarefasSequelize = await Tarefa.findAll({
      include: {
        model: Status,
        as: 'status',
      },
    });

    const tarefas = tarefasSequelize.map(tarefa => tarefa.get({ plain: true }));

    res.render('tarefas/listarTarefas', {
      layout: 'main',
      tarefas,
      total: tarefas.length
    });
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).send('Erro ao buscar tarefas');
  }
};

module.exports = {
  listarTarefas,
};
