const Category = require('../models/category')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = function(req, res) {
  const category = new Category(req.body)
  category.save(function(error, data) {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      })
    }
    res.json({ data })
  })
}
