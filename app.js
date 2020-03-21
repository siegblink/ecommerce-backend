const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

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
app.get('/', function(req, res) {
  res.send('Hello from Node.js.')
})

const port = process.env.PORT || 8000

app.listen(port, function() {
  console.log(`Server is running on port ${port}.`)
})
