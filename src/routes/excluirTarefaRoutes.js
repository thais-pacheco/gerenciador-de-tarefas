const express = require('express');
const router = express.Router();
const excluirTarefaController = require('../controllers/excluirTarefaController');

//Excluir (DELETE)
router.delete('/tarefas/deletar/:id', excluirTarefaController);

module.exports = router;