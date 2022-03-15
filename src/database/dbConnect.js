require('dotenv').config()
const logger = require('../config/logger')
const uri = process.env.MONGODB_URI
const mongoose = require('mongoose')

module.exports.getConnection = async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => logger.info('Connected to MongoDB...'))
    .catch((err) => logger.error('Could not connect to MongoDB...', err))
}