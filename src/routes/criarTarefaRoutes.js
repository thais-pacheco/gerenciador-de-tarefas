const express = require('express');
const router = express.Router();
const criarTarefaController = require('../controllers/criarTarefaController');

//Adicionar (CREATE)
router.post('/tarefas/adicionar', criarTarefaController.criarTarefa);

module.exports = router;