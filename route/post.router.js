// const express = require("express")
// const { PostModel } = require("../model/post.model")
// require('dotenv').config()

// const post_route = express.Router()

// post_route.get("/", async (req, res) => {
//     const query = req.query

//     try {
//         const post = await PostModel.find(query)
//         res.send(post)
//     } catch (error) {
//         console.log(error);
//         res.send({ "err": "Something went wrong" })
//     }
// })

// post_route.post("/", async (req, res) => {
//     const body = req.body
//     try {
//         // const post = new PostModel(body)
//         // await post.save()


//         await PostModel.insertMany(body);
//         res.send("Post has been inserted")
//     } catch (error) {
//         console.log(error);
//         res.send({ "err": "Something went wrong" })
//     }
// })

// post_route.patch("/update/:id", async (req, res) => {
//     const id = req.params.id;
//     const body = req.body;
//     //const post = await PostModel.findOne({"_id":id})
//     // const userID_in_post = post.userID;
//     // const userID_in_req = req.body.userID
//     try {
//         await PostModel.findByIdAndUpdate({ _id: id }, body)
//         res.send("Post has been updated")
//         // if (userID_in_req !== userID_in_post) {
//         //     res.send({"Msg":"Your not Authorized"})
//         // } else {
//         //     await PostModel.findByIdAndUpdate({_id:id},body)
//         //     res.send("Post has been updated")
//         // }
//     } catch (error) {
//         console.log(error);
//         res.send({ "err": "Something went wrong" })
//     }
// })

// post_route.delete("/delete/:id", async (req, res) => {
//     const id = req.params.id;
//     // const post = await PostModel.findOne({"_id":id})
//     // const userID_in_post = post.userID;
//     // const userID_in_req = req.body.userID
//     try {
//         await PostModel.findByIdAndDelete({ _id: id })
//         res.send("Post has been Deleted")
//         // if (userID_in_req !== userID_in_post) {
//         //     res.send({"Msg":"Your not Authorized"})
//         // } else {
//         //     await PostModel.findByIdAndDelete({_id:id})
//         //     res.send("Post has been Deleted")
//         // }
//     } catch (error) {
//         console.log(error);
//         res.send({ "err": "Something went wrong" })
//     }
// })

// module.exports = { post_route }




const express = require("express")
const fs = require("fs")
const studentRoute = express.Router();
//const {validator}=require("./middlewares/validator.middleware.js")

studentRoute.get("/students", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    res.send(parsedData.students)
})

studentRoute.get("/students/:rollNo", (req, res) => {
    const read = fs.readFileSync("./db.json");

    const parsedData = JSON.parse(read);
    let data = req.params.rollNo;
    data = data.split("").map(Number)
    data = data.slice(1)
    data = data.join("")
    console.log(data)
    console.log(req.params.rollNo.slice(1))
    let flag = true;
    parsedData.students.forEach((item, index) => {

        if (item.roll_no == data) {
            res.send(item)
            flag = false;
        }
    });
    if (flag) {
        res.send("Bad request")
    }

})


studentRoute.post("/students/addstudent", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    parsedData.students.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(parsedData));
    res.send("Student added")
})

//studentRoute.use(validator)

studentRoute.patch("/students/:rollNo", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    let data = req.params.rollNo;
    console.log(data)
    // data = data.split("").map(Number)
    // data = data.slice(1)
    // data = data.join("")
    parsedData.students.forEach((item, index) => {
        //  console.log(req.body)
        //console.log(data)
        if (item.roll_no == data) {
            if (item.name !== req.body.name && req.body.name !== undefined) {
                console.log(item.name, req.body.name)
                item.name = req.body.name
            }
            if (item.location !== req.body.location && req.body.location !== undefined) {
                console.log(item.location, req.body.location)
                item.location = req.body.location
            }
            if (item.course !== req.body.course && req.body.course !== undefined) {
                console.log(item.course, req.body.course)
                item.course = req.body.course
            }


        }
    });

    fs.writeFileSync("./db.json", JSON.stringify(parsedData));
    res.send("Student information modified")
})

studentRoute.delete("/students/:rollNo", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    let data = req.params.rollNo;
    // data = data.split("").map(Number)
    // data = data.slice(1)
    // data = data.join("")
    parsedData.students.forEach((item, index) => {
        console.log(req.body)
        if (item.roll_no == data) {
            parsedData.students.splice(index, 1)
        }
    });
    fs.writeFileSync("./db.json", JSON.stringify(parsedData));
    res.send("Student deleted")
})


module.exports = {
    studentRoute
}