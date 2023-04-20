const express = require("express")
const {connection} = require("./config/db")
const {user_router} = require("./route/user.router")
const {post_route} = require("./route/post.router")
const {authentication} = require("./middleware/authentication.mid")
require('dotenv').config()
const cors =require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/users",user_router)
//app.use(authentication)
app.use("/posts",post_route)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected DB...");
    } catch (error) {
        console.log("DB connection lose");
    }
    console.log(`Running at port ${process.env.port}`);
})