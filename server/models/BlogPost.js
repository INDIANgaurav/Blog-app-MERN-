const mongoose = require('mongoose');

const blogpostschema = new mongoose.Schema({
    title : String ,
    description : String ,

},{
    timestamps:true
})


const BlogPost = mongoose.model('BlogPost' , blogpostschema ) ;
module.exports = BlogPost ;