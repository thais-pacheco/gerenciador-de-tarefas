const express = require('express');
const router = express.Router();
const criarTarefaController = require('../controllers/criarTarefaController');
const excluirTarefaController = require('../controllers/excluirTarefaController');

//Adicionar (CREATE)
router.post('/tarefas/adicionar', criarTarefaController.criarTarefa);

//Editar (UPDATE)

//Excluir (DELETE)
router.delete('/tarefas/delete/:id', excluirTarefaController);

module.exports = router;