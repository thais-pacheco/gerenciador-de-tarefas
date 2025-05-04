const express = require('express');
const router = express.Router();
const excluirTarefaController = require('../controllers/excluirTarefaController');
const autenticar = require('../middlewares/authMiddleware');

//Excluir (DELETE)
router.delete('/tarefas/deletar/:id', autenticar, excluirTarefaController);

module.exports = router;