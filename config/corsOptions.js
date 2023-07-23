const corsConfig = require('./cors.js')

const corsOptions = {
  origin: (origin, callback) => {
    if (corsConfig.indexOf(origin) !== -1 || !origin) {
      callback(null, true) // no error and the request or the origin is allowed to send request to this api
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

module.exports = corsOptions
