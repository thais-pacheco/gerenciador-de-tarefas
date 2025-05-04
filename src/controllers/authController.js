const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarioModel');

// Cadastro
const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.render('auth/cadastro', {
        layout: 'auth',
        erro: 'Email já cadastrado',
        nome,
        email
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await Usuario.create({ nome, email, senha: senhaHash });

    res.redirect('/login');
  } catch (error) {
    res.render('auth/cadastro', {
      layout: 'auth',
      erro: 'Erro ao cadastrar usuário',
      detalhes: error.message
    });
  }
};

// Login
const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).render('auth/login', {
        layout: 'auth',
        title: 'Login',
        erro: 'Usuário não encontrado',
        email
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).render('auth/login', {
        layout: 'auth',
        title: 'Login',
        erro: 'Senha incorreta',
        email
      });
    }

    req.session.usuarioId = usuario.id;
    req.session.usuarioNome = usuario.nome;

    res.redirect('/tarefas');
  } catch (error) {
    res.status(500).render('auth/login', {
      layout: 'auth',
      title: 'Login',
      erro: 'Erro no login',
      detalhes: error.message
    });
  }
};

// Logout
const logoutUsuario = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao encerrar sessão' });
    }
    res.redirect('/login'); // Redireciona para o login após o logout
  });
};

module.exports = { cadastrarUsuario, loginUsuario, logoutUsuario };
