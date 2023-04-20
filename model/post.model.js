const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    name: String,
    avatar: String,
    price: Number,
    rating: Number
})

const PostModel = mongoose.model("post",postSchema)

module.exports = {PostModel}