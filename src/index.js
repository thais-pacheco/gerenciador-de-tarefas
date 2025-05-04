require('dotenv').config(); //Variaveis de ambiente
const port = process.env.PORT;
const sequelize = require('./database/db');
const express = require("express");
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');

//Routes
const tarefaRoutes = require('./routes/tarefaRoutes');
const criarTarefaRoutes = require('./routes/criarTarefaRoutes');
const excluirTarefaRoutes = require('./routes/excluirTarefaRoutes');
const editarTarefaRoutes = require('./routes/editarTarefaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
  }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos (CSS, imagens, etc.)

app.use(tarefaRoutes);
app.use(criarTarefaRoutes);
app.use(excluirTarefaRoutes);
app.use(editarTarefaRoutes);
app.use(authRoutes);

app.get('/', (req, res) => {
    res.redirect('/tarefas');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});