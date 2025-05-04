const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarioModel');

// Cadastro
const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ erro: 'Email já cadastrado' });

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash });

    // Redireciona para a página de login após cadastro
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhes: error.message });
  }
};

// Login
const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Senha incorreta' });

    // Estabelece a sessão com o usuário logado
    req.session.usuarioId = usuario.id;
    req.session.usuarioNome = usuario.nome;

    res.redirect('/tarefas'); // Redireciona após o login
  } catch (error) {
    res.status(500).json({ erro: 'Erro no login', detalhes: error.message });
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
