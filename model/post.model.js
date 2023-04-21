const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    name: String,
    age: Number,
    image: String,
    place: String,
    gender: String
})

const PostModel = mongoose.model("post",postSchema)

module.exports = {PostModel}