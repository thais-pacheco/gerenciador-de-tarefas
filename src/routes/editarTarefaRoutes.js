const express = require('express');
const router = express.Router();
const editarTarefaController = require('../controllers/editarTarefaController');

//Editar (UPDATE)
router.post('/tarefas/editar/:id', editarTarefaController);

module.exports = router;