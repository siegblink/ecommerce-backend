// Get unique error field name
const getUniqueMessage = function(error) {
  let output

  try {
    let fieldName = error.errmsg.substring(
      error.errmsg.lastIndexOf('.$') + 2,
      error.errmsg.lastIndexOf('_1')
    )
    output =
      fieldName.chartAt(0).toUpperCase() +
      fieldName.slice(1) +
      ' already exists'
  } catch (error) {
    output = `Unique field already exist.`
  }
  return output
}

exports.errorHandler = function(error) {
  let message = 'Oops! Something went wrong'

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = getUniqueMessage(error)
        break
      default:
        message = 'Something went wrong.'
    }
  } else {
    for (let errorName in error.error) {
      if (error.error[errorName].message) {
        message = error.error[errorName].message
      }
    }
  }
  return message
}
