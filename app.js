const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
// Import routes
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

// Routes
app.use('/api', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, function() {
  console.log(`Server is running on port ${port}.`)
})
