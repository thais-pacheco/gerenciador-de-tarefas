const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const autenticar = require('../middlewares/authMiddleware');

router.get('/tarefas', autenticar, tarefaController.listarTarefas);

module.exports = router;
