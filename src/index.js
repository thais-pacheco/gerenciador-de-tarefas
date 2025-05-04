require('dotenv').config();

const express = require("express");
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const port = process.env.PORT;
const segredo = process.env.SECRET

// Rotas
const tarefaRoutes = require('./routes/tarefaRoutes');
const criarTarefaRoutes = require('./routes/criarTarefaRoutes');
const excluirTarefaRoutes = require('./routes/excluirTarefaRoutes');
const editarTarefaRoutes = require('./routes/editarTarefaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Configuração do Handlebars com helper 'eq' e permissão para protótipos (Sequelize)
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {
    eq: (a, b) => a == b
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configuração de Sessão
app.use(session({
  secret: segredo,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos

// Rotas
app.use(tarefaRoutes);
app.use(criarTarefaRoutes);
app.use(excluirTarefaRoutes);
app.use(editarTarefaRoutes);
app.use(authRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
