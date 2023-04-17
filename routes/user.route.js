const express = require('express');
const {UserModel}= require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRoute = express.Router()

userRoute.post("/register",async(req,res)=>{
    try {
        const {email,password,role} = req.body
        bcrypt.hash(password, 3, async(err, hash)=> {
            const user =await UserModel({email,password:hash,role})
            user.save()
            res.status(200).send({massage:"User registration successful"})
        });
    } catch (error) {
        console.log(error)
    }
})

userRoute.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body
        const  user= await UserModel.findOne({email})
        bcrypt.compare(password, user.password, function(err, result) {
            const token = jwt.sign({userId:user._id},"deathNote",{expiresIn:760})
            const refreshToken = jwt.sign({userId:user._id},"light",{expiresIn:180})
            res.status(200).send({token:token, refreshToken:refreshToken,massage:"User logged in successfully"})
        });
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    userRoute
}