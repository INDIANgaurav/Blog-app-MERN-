const express = require('express');
const app = express() ; 
const cors = require('cors');
const {connectDb} = require("./connection")
const BlogPost = require("./models/BlogPost")
const port = 5000;
connectDb();
app.use(express.json());
app.use(cors()) ;



// update blog post
app.post('/post-blog', async(req, res)=>{
    let blog = new BlogPost({
        title : req.body.title,
        description : req.body.description,
    }) ;
    await blog.save(); 

    res.json({
        message : "Blog Post saved successfully" , blog 
    }) ;
} )

// get blog post
app.get("/get-blogs" , async (req, res)=>{
    let blogs = await BlogPost.find();
    if(!blogs){
        res.status(404).json({
            message : "No blogs found"
        }) ;
    }
    res.json({blogs}) ;
})

// delete blog post 
app.delete( "/delete-blog/:id" , async(req , res ) => {
    let blog =  await BlogPost.findByIdAndDelete(req.params.id);
    console.log("this blog is deleted :- ",blog);
   if(blog){
    res.status(200).json({
        message: "blog deleted successfully",
        
    }
    ) 
   }
   else{
       res.status(404).json({
           message : "No blog found"
       }) ;
   }
})

// update the blog 
app.put("/update-blog/:id" , async(req,res) => {
        const { title , description } = req.body ;
    let blog = await BlogPost.findByIdAndUpdate(req.params.id, {new: true});
    if(!blog){
        res.status(404).json({
            message : "No blog found"
        }) ;
    }
   
    if( !title && !description) {
        res.status(400).json({
            message : "Please provide title and description"
        }) ;
    } 
    else if ( !req.body.title){
        blog.description = req.body.description ;
    }
    else if ( !req.body.description){
        blog.title = req.body.title ;
    }
    else{
        blog.title = req.body.title ;
        blog.description = req.body.description ;
    }
    
    await blog.save();
    res.status(200).json({
        message : "Blog updated successfully",
        blog
    })
})

app.listen(port , () => {
    console.log("your server is running on port " + port) ;
});
