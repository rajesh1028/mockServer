const express = require("express")
const {UserModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const user_router = express.Router()

user_router.get("/",(req,res)=>{
    res.send("HOME page")
})

user_router.post("/register",async (req,res)=>{
    const {email, password} = req.body
    try {
        bcrypt.hash(password, 5, async (err,secure_password)=>{
            if (err) {
                console.log(err);
            } else {
                const user = new UserModel({email,password:secure_password})
                await user.save()
                res.send("User has been register")
            }
        })
    } catch (error) {
        console.log(error);
        res.send({"err":"Something went wrong"})
    }
})

user_router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.find({email})
        const hash_pass = user[0].password;
        if(user.length>0){
            bcrypt.compare(password, hash_pass, (err, result)=>{
                if(result){
                    const token = jwt.sign({userID : user[0]._id},process.env.key);
                    res.send({"msg":"Login successfull","token":token})
                }else{
                    res.send("Wrong credential")
                }
            })
        }else{
            res.send("Wrong credential")
        }
    } catch (error) {
        console.log(error);
        res.send({"err":"Something went wrong"})
    }
})

module.exports = {user_router}