const mongoose = require('mongoose');
const MONGODB_URI =  'mongodb+srv://gasharma512:Thesunset143@cluster0.cjn7j8j.mongodb.net/blogs?retryWrites=true&w=majority'
const connectDb = async () =>{
  
     const connection =   await mongoose.connect( MONGODB_URI )
     if(connection)   console.log('Connected to Database')
 
        else console.log("Database connection error")
 }

module.exports= {connectDb};