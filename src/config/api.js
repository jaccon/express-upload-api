const express = require('express');

const api_config = {
    'app_name' : 'NodeJS Upload API',
    'app_bundle' : '1.0.1',
    'app_default_port' : 3333,
    'app_db_uri' : 'mongodb+srv://oministack:oministack@cluster0-kmocs.mongodb.net/oministack?retryWrites=true',
    'app_dev_url' : 'http://localhost:3333',
    'app_prod_url' : '',
    'app_upload_dir' : 'tmp'
}

module.exports = api_config;