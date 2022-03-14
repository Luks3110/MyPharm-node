//imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const { checkToken } = require('./middleware/authMiddleware')

mongoose.connect('mongodb://localhost:27017/mypharm_db')
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error('Could not connect to MongoDB...', err))


//read json
app.use(
    express.urlencoded({
        extended: true
    }),
)
app.use(express.json());

//parse cookies
app.use(cookieParser())

//api routes
const ProductRoute = require('./routes/Product.route')
const UserRoute = require('./routes/User.route')
const CategoryRoute = require('./routes/Category.route')
const BrandRoute = require('./routes/Brand.route')

app.use('/users', UserRoute)
app.use('/products', checkToken, ProductRoute)
app.use('/categories', checkToken, CategoryRoute)
app.use('/brands', checkToken, BrandRoute)

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

app.listen(3000, () => {
    console.log('Server started on port 3000');
})
