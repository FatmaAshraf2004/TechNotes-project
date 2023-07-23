const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors,json } = format;
const { v4 } = require('uuid');

const logFormat = printf(({ level, message, timestamp, stack ,obj}) => {
    let logMessage= `${timestamp}| ${v4()} | ${level.toLocaleUpperCase()} | ${stack || message}`;
    logMessage= obj? message + " | " + JSON.stringify(obj) : logMessage;
    return logMessage
})

const logger = createLogger({
    format: combine(
    //   format.colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      json(),
      logFormat ,
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/request.log', level: 'info' }),
        new transports.File({ filename: './logs/all.log' }),
        new transports.File({ filename: './logs/note.log' }),

    ],
  }); 
module.exports = logger