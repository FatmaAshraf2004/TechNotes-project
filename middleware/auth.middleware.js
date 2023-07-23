const jwt = require("jsonwebtoken")

module.exports = function(req,res,next){
   const token = req.header('token');
   if (!token) {
    return res.status(401).send('Unauthenticated Access Rejected !!!')
   }

   try {
    const decodeeToken = jwt.verify(token,'secret_key')
    req.user = decodeeToken;
    next()
   } catch (error) {
    res.status(400).json({message:"Wrong Token"})
   }
}