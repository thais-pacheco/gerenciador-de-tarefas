const Tarefa = require('../models/tarefaModel');
const Status = require('../models/statusModel');

const editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, status_id } = req.body;

  try {
    // Verifica se a tarefa existe
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    // Valida o status_id, se fornecido
    if (status_id) {
      const statusExiste = await Status.findByPk(status_id);
      if (!statusExiste) {
        return res.status(400).json({ erro: 'Status informado não existe.' });
      }
    }

    // Atualiza os campos fornecidos
    tarefa.nome = nome || tarefa.nome;
    tarefa.descricao = descricao || tarefa.descricao;
    tarefa.status_id = status_id || tarefa.status_id;

    await tarefa.save();

    res.status(200).json({ mensagem: 'Tarefa atualizada com sucesso.', tarefa });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar tarefa.', detalhes: error.message });
  }
};

module.exports = editarTarefa;

