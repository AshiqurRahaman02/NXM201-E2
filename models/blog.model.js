const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title:String,
    body:String,
    authorId:String
})

const BlogModel = mongoose.model('blog', schema)

module.exports = {BlogModel}