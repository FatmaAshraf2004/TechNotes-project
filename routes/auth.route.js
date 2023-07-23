const express = require("express");
const router = express.Router();

const {login,logout,refreshToken} = require('../controller/auth.control.js')

router.post('/login',login)
router.post("/logout",logout)
router.post("/refresh",refreshToken)

module.exports = router