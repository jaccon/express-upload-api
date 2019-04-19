const express = require('express');
const mongoose = require('mongoose');
const app_port = 3333; // porta principal da aplicação
const app_db_url = 'mongodb+srv://oministack:oministack@cluster0-kmocs.mongodb.net/oministack?retryWrites=true';
const app = express();

// conhecta com o banco de dados Mongo Atlas
mongoose.connect(app_db_url, {
    useNewUrlParser: true
}); 

app.use(express.json()); // midleware - possibilita o recebimento de parametros JSON
app.use(express.urlencoded({extended: true})); // midleware - possibilita o recebimento de arquivos
app.use(require('./routes')); // importa o arquivo de rotas

app.listen(app_port);
