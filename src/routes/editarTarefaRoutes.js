const express = require('express');
const router = express.Router();
const { getEdicao, editarTarefa } = require('../controllers/editarTarefaController');
const autenticar = require('../middlewares/authMiddleware');

router.get('/tarefas/editar/:id', autenticar, getEdicao);

//Editar (UPDATE)
router.post('/tarefas/editar/:id', autenticar, editarTarefa);

module.exports = router;