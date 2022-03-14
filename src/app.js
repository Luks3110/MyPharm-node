//imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const { checkToken } = require('./middleware/authMiddleware')
const uri = process.env.MONGODB_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
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
app.use('/products', ProductRoute)
app.use('/categories', CategoryRoute)
app.use('/brands', BrandRoute)

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

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started on port 5000');
})
