const Tarefa = require('../models/tarefaModel');

const excluirTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    await tarefa.destroy();

    res.status(200).json({ mensagem: 'Tarefa excluída com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao excluir tarefa', detalhes: erro.message });
  }
};

module.exports = excluirTarefa;
