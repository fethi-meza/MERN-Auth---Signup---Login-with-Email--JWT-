const mongoose =require('mongoose')
require('dotenv').config()


const connectDB =async ()=>{
    try {
        await  mongoose.connect(process.env.MONGO_URI)
        console.log("conncted To Mongo DB")
     
    } catch (error) {
        (error) => console.log("conncetion is failde ", error)
    }
}

module.exports =connectDB