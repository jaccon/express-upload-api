const express = require('express');
const mongoose = require('mongoose');
const api_config = require('./config/api');

const app_port = process.env.PORT || api_config.app_default_port; // porta principal da aplicação
const app_db_url = api_config.app_db_uri;
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Socket IO
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

app.use((req, res, next) => {
    req.io = io;
    return next();
});
// Socket IO

// conhecta com o banco de dados Mongo Atlas
mongoose.connect(app_db_url, {
    useNewUrlParser: true
}); 

app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use('/files', express.static(path.resolve(__dirname, '..', api_config.app_upload_dir)))

app.use(require('./routes'))
console.log(`Load [ ${api_config.app_name} bundle ${api_config.app_bundle} ] `);
server.listen(app_port);