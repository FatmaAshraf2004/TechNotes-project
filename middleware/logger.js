const logger = require ("../services/logger.js")
const logEvents= (req,res,next)=>{
    logger.info(req.method + " | " + req.originalUrl)
    next()
    
}

module.exports = logEvents