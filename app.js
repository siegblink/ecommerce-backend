const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', function(req, res) {
  res.send('Hello from Node.js.')
})

const port = process.env.PORT || 8000

app.listen(port, function() {
  console.log(`Server is running on port ${port}.`)
})
