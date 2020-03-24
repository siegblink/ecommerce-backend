const formidable = require('formidable')
const fs = require('fs')
const lodash = require('lodash')
const Product = require('../models/product')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = function(req, res) {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, function(error, fields, files) {
    if (error) {
      return res.status(400).json({
        error: 'Image could not be uploaded.',
      })
    }
    let product = new Product(fields)

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }

    product.save(function(error, result) {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        })
      }
      res.json(result)
    })
  })
}
