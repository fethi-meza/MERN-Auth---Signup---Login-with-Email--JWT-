const router = require('express').Router()
const bcrypt =require('bcrypt')
const {User ,ValidateLoginUser} = require('../models/user')

router.post('/login', async(req,res)=>{
    try {
        const {error} = ValidateLoginUser(req.body)
if (error) {
    return res.status(400).json({success : false , message :error.details[0].message})
}

const user = await User.findOne({email: req.body.email})

if (!user) {
    return res.status(401).json({success :false , message : 'invalid  user or eamil '})
}

//verify the password
const ValiedPassword = await bcrypt.compare(req.body.password , user.password) ;
    
if (!ValiedPassword) {
    return res.status(401).json({ success :false,message:' user or eamil false'}) 
}

const token = user.generatAuthToken();
res.status(200).json({ data : token, message :'looged in successfly'})

    } catch (error) {
        res.status(500).json({success : false , message :'somthing went wrong in server'})
    }
})




module.exports =router