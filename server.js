require('dotenv').config()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
// const connectDB = require('./config/dbConn')
const logger = require("./middleware/logger.js")
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler');
mongoose.connect('mongodb://127.0.0.1:27017/techNotesDB')

const PORT = process.env.PORT || 5000

const router = require("./routes/root.js")
const noteRouter = require('./routes/note.route')
const usersRoutes = require("./routes/user.route.js")
const authRoutes = require("./routes/auth.route.js")

// connectDB()
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser());
app.use(cors());
app.use(errorHandler)

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', router)
app.use('/notes', noteRouter)
app.use('/user', usersRoutes)
app.use('/auth', authRoutes)

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname,'views','404.html'))
  } else if (req.accepts('json')) {
      logger.error(error.message)
      res.send({message:"404 not found"})
  } else {
      res.type('text').send('404 not found')
  }
})

mongoose.connection.once('open', ()=>{
  console.log('Connected to MongoDB')
})
mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);})

