const express = require('express');
const router = express.Router();
const criarTarefaController = require('../controllers/criarTarefaController');
const excluirTarefaController = require('../controllers/excluirTarefaController');
const editarTarefaController = require('../controllers/editarTarefaController');
const autenticar = require('../middlewares/authMiddleware');


//Adicionar (CREATE)
router.post('/tarefas/adicionar', criarTarefaController.criarTarefa);

//Editar (UPDATE)
router.post('/tarefas/editar/:id', editarTarefaController);

//Excluir (DELETE)
router.delete('/tarefas/delete/:id', excluirTarefaController);

module.exports = router;