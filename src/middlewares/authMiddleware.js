const autenticar = (req, res, next) => {
  // Verifica se o usuário está autenticado pela presença do usuarioId na sessão
  if (!req.session.usuarioId) {
    return res.redirect('/login');
  }
  // Se o usuário estiver autenticado, permite o acesso à próxima rota
  next();
};

module.exports = autenticar;