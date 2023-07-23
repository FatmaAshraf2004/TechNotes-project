const UserModel = require("../model/User.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req,res)=>{
    try {

        const {username,password} = req.body

        const user = await UserModel.findOne({username, password})
        if(!user){
        return res.status(404).json({message: "Invalid Username or Password !!!"})
        }

        const checkedPassword = await bcrypt.compare(password,user.password)
        if(!checkedPassword){
            return res.status(404).json({message: "Invalid Username or Password !!!"})
        }

        const token = user.generateTokens()
        const refreshToken = user.refreshTokens()

        await UserModel.findByIdAndUpdate(user._id)
        return res.header(token).status(201).json({RefreshToken:refreshToken})

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const logout = async (req,res)=>{
    try {
        if(req.headers && req.headers['token']){
            const token =(req.headers['token']).split(' ')[0]
            if (!token ) {
                return res.status(401).send('unAuthorization !!!')
            }

            res.status(200).json({
                message: "Log out Successfully !!!"
            })
        }
        
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}

const refreshToken = async (req,res) => {
    try {
        const refreshToken = req.header('token');
        
        if (!refreshToken) {
           return res.status(401).json({
            errors: [
                {
                message: "Token not found !!!",
                },
            ],
            });
        }

        const user = await jwt.verify(refreshToken,'refresh_key')
        const {_id,username,roles} = user
        const accessToken = jwt.sign({_id,username,roles},process.env.JWT_SECRET ,)
        res.json({ accessToken });
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports = {login,logout,refreshToken}