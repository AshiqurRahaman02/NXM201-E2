const jwt = require("jsonwebtoken")
const {UserModel}= require("../models/user.model")

const auth = async (req,res,next)=>{
    const token = req.headers.authorization
    const decoded = jwt.verify(token,"deathNote")

    if(decoded){
        const user = await UserModel.findById(decoded.userId)
        req.id=user.id
        req.role=user.role
        next()
    }else{
        res.send("login first")
    }
}

module.exports= {
    auth
}