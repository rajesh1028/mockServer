const express = require("express")
const {PostModel} = require("../model/post.model")
require('dotenv').config()

const post_route = express.Router()

post_route.get("/",async (req,res)=>{
    const query = req.query
    //device=MOBILE & device=PC
    try {
        const post = await PostModel.find(query)
        res.send(post)
    } catch (error) {
        console.log(error);
        res.send({"err":"Something went wrong"})
    }
})

post_route.post("/",async (req,res)=>{
    const body = req.body
    try {
        const post = new PostModel(body)
        await post.save()
        // await PostModel.insertMany(body)
        res.send("Post has been inserted")
    } catch (error) {
        console.log(error);
        res.send({"err":"Something went wrong"})
    }
})

post_route.patch("/update/:id",async (req,res)=>{
    const id = req.params.id;
    const body = req.body;
    //const post = await PostModel.findOne({"_id":id})
    // const userID_in_post = post.userID;
    // const userID_in_req = req.body.userID
    try {
        await PostModel.findByIdAndUpdate({_id:id},body)
        res.send("Post has been updated")
        // if (userID_in_req !== userID_in_post) {
        //     res.send({"Msg":"Your not Authorized"})
        // } else {
        //     await PostModel.findByIdAndUpdate({_id:id},body)
        //     res.send("Post has been updated")
        // }
    } catch (error) {
        console.log(error);
        res.send({"err":"Something went wrong"})
    }
})

post_route.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id;
    // const post = await PostModel.findOne({"_id":id})
    // const userID_in_post = post.userID;
    // const userID_in_req = req.body.userID
    try {
        await PostModel.findByIdAndDelete({_id:id})
        res.send("Post has been Deleted")
        // if (userID_in_req !== userID_in_post) {
        //     res.send({"Msg":"Your not Authorized"})
        // } else {
        //     await PostModel.findByIdAndDelete({_id:id})
        //     res.send("Post has been Deleted")
        // }
    } catch (error) {
        console.log(error);
        res.send({"err":"Something went wrong"})
    }
})

module.exports = {post_route}