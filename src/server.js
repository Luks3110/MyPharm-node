const app = require('./app')
const connection = require('./database/dbConnect')
const logger = require('./config/logger')
connection.getConnection().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        logger.info(`Server started on PORT: ${process.env.PORT || 5000}`);
    })
})

module.exports = app