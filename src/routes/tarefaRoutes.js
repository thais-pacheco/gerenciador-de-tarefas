const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

router.get('/tarefas', tarefaController.listarTarefas);

module.exports = router;
