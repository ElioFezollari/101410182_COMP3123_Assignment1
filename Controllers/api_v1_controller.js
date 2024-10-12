const User = require('../Models/UserSchema');

const apiV1Router = require('express').Router();

apiV1Router.post('/user/signup',async (req,res)=>{
    const {password,username,email} = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message:"Sorry this email is invalid"})
    }
    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({message:"Sorry, this user already exists"})
    }
    const uploadedUser = new User({username,email,password});
    await uploadedUser.save();
    res.status(201).json({message:"User created successfully","user_id":uploadedUser._id})
    console.log(password,username,email)
})

module.exports = apiV1Router