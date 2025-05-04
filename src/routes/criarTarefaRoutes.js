const express = require('express');
const router = express.Router();
const criarTarefaController = require('../controllers/criarTarefaController');
const autenticar = require('../middlewares/authMiddleware');

// GET - Exibir formulário
router.get('/tarefas/adicionar', autenticar, criarTarefaController.viewCriarTarefa);

// POST - Criar tarefa no banco
router.post('/tarefas/send', autenticar, criarTarefaController.criarTarefa);

module.exports = router;