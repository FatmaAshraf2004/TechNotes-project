const logger = require ("../services/logger.js")
const errorHandler = (error, req, res, next) =>{
    console.log(error);
    logger.error(error.message)
    return res.status(400).send(error.message);
}

module.exports = errorHandler;

// const { logEvents } = require('./logger.js')

// const errorHandler = (err, req, res, next) => {
//   logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
//   console.log(err.stack)

//   const status = res.statusCode ? res.statusCode : 500

//   res.status(status)
//   res.json({ message: err.message, isError: true })
// }

// module.exports = errorHandler