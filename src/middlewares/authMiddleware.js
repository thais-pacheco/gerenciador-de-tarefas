const autenticar = (req, res, next) => {
  // Verifica se o usuário está autenticado pela presença do usuarioId na sessão
  if (!req.session.usuarioId) {
    // Se não estiver autenticado, redireciona para o login
    return res.redirect('/login'); // Ou pode retornar um erro: res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  // Se o usuário estiver autenticado, permite o acesso à próxima rota
  next();
};

module.exports = autenticar;