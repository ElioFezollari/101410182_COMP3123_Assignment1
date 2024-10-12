const User = require('../Models/UserSchema');
const bcrypt = require('bcrypt');
const apiV1Router = require('express').Router();
const jwt = require('jsonwebtoken')
apiV1Router.post('/user/signup',async (req,res)=>{
    const {password,username,email} = req.body

    if(!email || !username || !password){
        return res.status(400).json({error:"Please make sure that you have submitted your password username and email"})
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({error:"Sorry this email is invalid"})
    }
    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({error:"Sorry, this user already exists"})
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const uploadedUser = new User({username,email,password:hashedPassword});
    await uploadedUser.save();
    res.status(201).json({message:"User created successfully","user_id":uploadedUser._id})
})

apiV1Router.post('/user/login',async (req,res)=>{
    const {email,password} = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !password){
        return res.status(400).json({error:"Please make sure that you have submitted your password  and email"})
    }
    if(!emailRegex.test(email)){
        return res.status(400).json({message:"Sorry this email is invalid"})
    }
    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({message:"User with that email does not exist."})
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        return res.status(401).json({message:"Password or email is wrong."})
    }
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1800s' });
    res.status(200).json({message:"Login successful.", jwt:jwtToken})

})
module.exports = apiV1Router