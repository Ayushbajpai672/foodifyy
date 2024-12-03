const mongoose = require('mongoose') ;
require('dotenv').config() ;

mongoose.connect(`${process.env.MONGODB_URI}`) ;

const cn = mongoose.connection ;

cn.once("open", (req,res)=>{
    console.log("Connected to MongoDB") ;
})

module.exports = cn ;

