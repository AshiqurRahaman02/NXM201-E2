const express = require('express');
const {BlogModel}= require('../models/blog.model')


const blogRoute = express.Router()


blogRoute.post("/create", async(req, res)=>{
    try {
        const {title,body} = req.body
        const blog =await BlogModel({title,body,authorId:req.id})
        blog.save()
        res.status(200).send({massage:"blog created successfully"})
    } catch (error) {
        console.log(error)
    }
});

blogRoute.get("/",async(req, res)=>{
    try {
        const blogs =await BlogModel.find()
        res.status(200).send(blogs)
    } catch (error) {
        console.log(error)
    }
})

blogRoute.patch("/update/:id",async(req, res)=>{
    try {
        const blog = await BlogModel.findById(req.params.id)
        if(blog.authorId==req.id || req.role=="Moderator"){
            const newBlog = await BlogModel.findByIdAndUpdate(req.params.id,req.body)
            res.status(200).send("updated blog")
        }else{
            res.status(401).send("Unathorized blog")
        }
    } catch (error) {
        console.log(error)
    }
})

blogRoute.delete("/delete/:id",async(req, res)=>{
    try {
        const blog = await BlogModel.findById(req.params.id)
        if(blog.authorId==req.id || req.role=="Moderator"){
            const newBlog = await BlogModel.findByIdAndDelete(req.params.id)
            res.status(200).send("Blog deleted successfully")
        }else{
            res.status(401).send("Unathorized blog")
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports={
    blogRoute
}