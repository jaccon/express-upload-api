const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const api_config = require('../config/api');

module.exports = {
    
    dest: path.resolve(__dirname, '..', '..', api_config.app_upload_dir),

    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', api_config.app_upload_dir))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err)

                file.key = `${hash.toString('hex')}-${file.originalname}`

                callback(null, file.key)
            })
        }

    })
}