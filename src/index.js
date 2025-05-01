require('dotenv').config(); //Variaveis de ambiente
const sequelize = require('./database/db');
const express = require("express");
const app = express();

//Routes
const tarefaRoutes = require('./routes/tarefaRoutes');

app.use(express.json());
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('API de Gerenciamento de Tarefas está rodando 🚀');
});

app.use(tarefaRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});