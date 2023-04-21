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
const dogRoute = express.Router();
const { authentication } = require("../middleware/authentication.mid");
//const {validator}=require("./middlewares/validator.middleware.js")

dogRoute.get("/dogs", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    // console.log(parsedData);
    res.send(parsedData.dogs);
})

// dogRoute.use(authentication);

dogRoute.get("/dogs/:id", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    let data = req.params.id;
    let userData = [];
   
    parsedData.dogs.forEach((item, index) => {

        if (item.id == data) {
            userData.push(item);
        }
    });
    res.send(userData || "No data found");

})


dogRoute.post("/dogs/addDog", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    let obj = req.body;
    let randomNumber = Math.floor(Math.random() * 900000) + 100000;
    obj["id"] = randomNumber;
    parsedData.dogs.push(obj);
    fs.writeFileSync("./db.json", JSON.stringify(parsedData));
    res.send("dogs added");
})

dogRoute.use(authentication);

dogRoute.patch("/dogs/:id", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    let data = req.params.id;
    parsedData.dogs.forEach((item, index) => {
        if (item.id == data) {
            item.name = req.body.name;
            item.age = req.body.age;
            item.place = req.body.place;
            item.gender = req.body.gender;
            item.image = req.body.image;
        }
    });

    fs.writeFileSync("./db.json", JSON.stringify(parsedData));
    res.send("dog information updated");
})

dogRoute.delete("/dogs/:id", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    let data = req.params.id;
    parsedData.dogs.forEach((item, index) => {
        if (item.id == data) {
            parsedData.dogs.splice(index, 1);
        }
    });
    fs.writeFileSync("./db.json", JSON.stringify(parsedData));
    res.send("dog removed");
})

// // login

// dogRoute.delete("/dogs/:id", (req, res) => {
//     const read = fs.readFileSync("./db.json");
//     const parsedData = JSON.parse(read);
//     let data = req.params.id;
//     parsedData.dogs.forEach((item, index) => {
//         if (item.id == data) {
//             parsedData.dogs.splice(index, 1);
//         }
//     });
//     fs.writeFileSync("./db.json", JSON.stringify(parsedData));
//     res.send("dog removed");
// })


module.exports = {
    dogRoute
}