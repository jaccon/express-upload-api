const express = require('express');
const mongoose = require('mongoose');
const app_port = process.env.PORT || 3333; // porta principal da aplicação
const app_db_url = 'mongodb+srv://oministack:oministack@cluster0-kmocs.mongodb.net/oministack?retryWrites=true';
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

// conhecta com o banco de dados Mongo Atlas
mongoose.connect(app_db_url, {
    useNewUrlParser: true
}); 

// Socket IO
app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json()); // midleware - possibilita o recebimento de parametros JSON
app.use(express.urlencoded({extended: true})); // midleware - possibilita o recebimento de arquivos
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes')); // importa o arquivo de rotas

server.listen(app_port);
