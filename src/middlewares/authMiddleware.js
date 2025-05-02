const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  try {
    const decodificado = jwt.verify(token, 'seu_segredo_jwt');
    req.usuarioId = decodificado.id;
    next();
  } catch (error) {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};

module.exports = autenticar;
