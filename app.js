const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
// Import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

// App
const app = express()

// Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(function() {
    console.log('Database connected.')
  })

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// Routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, function() {
  console.log(`Server is running on port ${port}.`)
})
