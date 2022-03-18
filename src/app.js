//imports
const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { checkToken } = require('./middleware/authMiddleware')

//read json
app.use(
    express.urlencoded({
        extended: true
    }),
)
app.use(cors())
app.use(express.json());

//parse cookies
app.use(cookieParser())

//api routes
const ProductRoute = require('./routes/Product.route')
const UserRoute = require('./routes/User.route')
const CategoryRoute = require('./routes/Category.route')
const BrandRoute = require('./routes/Brand.route')

app.use('/usuarios', UserRoute)
app.use('/produtos', ProductRoute)
app.use('/categorias', CategoryRoute)
app.use('/marcas', BrandRoute)

app.use((req, res, next) => {
    const err = new Error("Not found")
    err.status = 404
    next(err)
})

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || "Internal server error"
        }
    })
})

module.exports = app
