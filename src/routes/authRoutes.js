const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/cadastrar', (req, res) => {
    res.render('auth/cadastro', { layout: 'auth', title: 'Cadastro' });
});
  
router.get('/login', (req, res) => {
    res.render('auth/login', { layout: 'auth', title: 'Login' });
});

router.post('/cadastrar', authController.cadastrarUsuario);

router.post('/login', authController.loginUsuario);

router.post('/logout', authController.logoutUsuario);

module.exports = router;
