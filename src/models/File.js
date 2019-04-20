const mongoose = require('mongoose');
const api_config = require('../config/api');

const File = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    path: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

File.virtual('url').get(function() {
    const url = process.env.URL || api_config.app_dev_url;

    return `${url}/files/${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model('File', File)