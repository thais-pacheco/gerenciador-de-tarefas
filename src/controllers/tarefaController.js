const Tarefa = require('../models/tarefaModel');
const Status = require('../models/statusModel');

const listarTarefas = (req, res) => {
  Tarefa.findAll({
    include: {
      model: Status,
      as: 'status',
    },
    order: [['id', 'DESC']]
  })
  .then(tarefas => {
    const tarefasPlanas = tarefas.map(t => t.get({ plain: true }));
    console.log(tarefasPlanas);

    res.render('tarefas/listarTarefas', {
      layout: 'main',
      tarefas: tarefasPlanas,
      total: tarefasPlanas.length
    });
  })
  .catch(erro => {
    console.error('Erro ao buscar tarefas:', erro);
    res.status(500).send('Erro ao buscar tarefas');
  });
};

module.exports = {
  listarTarefas,
};