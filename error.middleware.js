const errorResponder = (err, request, response, next) => {
   response.header("Content-Type", 'application/json')
   response.status(err.statusCode || 500).send(err.message)
}

module.exports = { errorResponder };
