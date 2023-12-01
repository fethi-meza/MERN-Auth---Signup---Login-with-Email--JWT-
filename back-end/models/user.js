const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')

const UserSchema = new  mongoose.Schema({
    firstName :{
        type :String ,
        required : true ,
    },
    lastName :{
        type :String ,
        required : true ,
    } ,
    email :{
        type :String ,
        required : true ,
    },
    password :{
        type :String ,
        required : true ,
    }
},{timestamps : true})

UserSchema.methods.generatAuthToken = function () {
    const token = jwt.sign({_id : this._id }, process.env.previatKey , {expiresIn :"7d"}) 
    return token
}
const User = mongoose.model('User',UserSchema)



//validate regsetr  User 


const validateRegsetrUser = (data)=>{
    const Schema  = joi.object({
        firstName : joi.string().min(3).max(45).trim().required() ,
        lastName : joi.string().min(3).max(45).trim().required(),
        email : joi.string().min(3).max(45).trim().email().required(),
        password : joi.string().min(8).max(45).trim().password().required()
    })
    return Schema.validate(data)
}


//Validate Login User

function ValidateLoginUser(data){
    const Schema =Joi.object({
        email : joi.string().min(3).max(45).trim().email().required(),
        password : joi.string().min(8).max(45).trim().password().required()
    });
    return Schema.validate(data)
    }

module.exports ={User ,validateRegsetrUser ,ValidateLoginUser }