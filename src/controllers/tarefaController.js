const Tarefa = require('../models/tarefaModel');
const Status = require('../models/statusModel');

const listarTarefas = async (req, res) => {
  const statusFiltrado = req.query.status;

  try {
    const statusList = await Status.findAll();

    const whereCondition = statusFiltrado
      ? { status_id: statusFiltrado }
      : {};

    const tarefas = await Tarefa.findAll({
      where: whereCondition,
      include: { model: Status, as: 'status' },
      order: [['id', 'DESC']]
    });

    const tarefasPlanas = tarefas.map(t => t.get({ plain: true }));

    res.render('tarefas/listarTarefas', {
      layout: 'main',
      tarefas: tarefasPlanas,
      total: tarefasPlanas.length,
      statusList: statusList.map(s => s.get({ plain: true })),
      statusFiltrado
    });

  } catch (erro) {
    console.error('Erro ao buscar tarefas:', erro);
    res.status(500).send('Erro ao buscar tarefas');
  }
};

module.exports = {
  listarTarefas,
};
