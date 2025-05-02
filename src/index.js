require('dotenv').config(); //Variaveis de ambiente
const sequelize = require('./database/db');
const express = require("express");
const app = express();
const cors = require('cors');

//Routes
const tarefaRoutes = require('./routes/tarefaRoutes');
const crudTarefaRoutes = require('./routes/crudTarefaRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors()); 
app.use(express.json());
const port = process.env.PORT;

app.use(tarefaRoutes);
app.use(crudTarefaRoutes);

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.redirect('/tarefas');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});