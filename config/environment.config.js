const fs = require('fs')
var config = process.env
if (fs.existsSync('.env')) {
    const dotenv = require('dotenv')
    config = dotenv.parse(fs.readFileSync('.env'))
}

module.exports = {
    DB_HOST: config.DB_HOST,
    DB_PORT: config.DB_PORT, 
    DB_USERNAME: config.DB_NAME,
    DB_PASSWORD: config.DB_PASSWORD,
    DB_NAME: config.DB_NAME,
    MONGO_URL: config.MONGO_URL,
    ENCRYPTION_KEY: ENCRYPTION_KEY,
    SALT_ROUNDS: SALT_ROUNDS,
    SECRET_KEY: SECRET_KEY
}