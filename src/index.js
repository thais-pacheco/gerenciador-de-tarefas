require('dotenv').config(); //Variaveis de ambiente
const sequelize = require('./database/db');
const express = require("express");
const app = express();

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('API de Gerenciamento de Tarefas está rodando 🚀');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});