const express = require("express");
const {connection} = require("./db")
const {userRoute} = require("./routes/user.route")
const {blogRoute} = require("./routes/blog.route")
const {auth} = require("./middlewares/auth.middleware")

const app = express()

app.use(express.json());

app.use("/user",userRoute)
app.use(auth)
app.use("/blog",blogRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connection established")
    } catch (error) {
        console.log(error)
    }
    console.log(`listening on ${process.env.port}`)
})