const Tarefa = require('../models/tarefaModel');
const Status = require('../models/statusModel');

function getEdicao(req, res) {
  const tarefaId = req.params.id;

  Promise.all([
    Tarefa.findByPk(tarefaId),
    Status.findAll()
  ])
    .then(([tarefa, statusList]) => {
      if (!tarefa) {
        return res.redirect('/tarefas');
      }

      res.render('tarefas/editarTarefas', {
        edit: tarefa,
        statusList
      });
    })
    .catch((err) => {
      res.send("Erro ao buscar tarefa: " + err);
    });
}

function editarTarefa(req, res) {
  const tarefaId = req.params.id;

  Tarefa.findByPk(tarefaId)
    .then((tarefa) => {
      if (!tarefa) {
        return res.redirect('/tarefas');
      }

      tarefa.nome = req.body.nome;
      tarefa.descricao = req.body.descricao;
      tarefa.status_id = req.body.status_id;

      return tarefa.save();
    })
    .then(() => {
      res.redirect('/tarefas');
    })
    .catch((err) => {
      console.error('Erro ao atualizar tarefa:', err);
      res.send('Erro ao atualizar: ' + err);
    });
}

module.exports = {
  getEdicao,
  editarTarefa,
};

