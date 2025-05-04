const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

// Cadastro
const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ erro: 'Email já cadastrado' });

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash });

    // res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
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

    const token = jwt.sign({ id: usuario.id }, 'seu_segredo_jwt', { expiresIn: '1h' });
    //res.status(200).json({ mensagem: 'Login bem-sucedido', token });
    res.redirect('/tarefas');
  } catch (error) {
    res.status(500).json({ erro: 'Erro no login', detalhes: error.message });
  }
};

module.exports = { cadastrarUsuario, loginUsuario };
