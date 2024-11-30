const User = require('../Models/UserSchema');
const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const jwt = require('jsonwebtoken')
const { body,validationResult } = require('express-validator');
userRouter.post('/signup', [body('email').optional().isEmail().withMessage('Invalid email format.'),
                            body('username').optional().notEmpty().withMessage('Username must not be empty.'),
                            body('password').notEmpty().withMessage('Password must not be empty.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array().map(err => err.msg).join(', ') });
    }
    const { password, username, email } = req.body
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        return res.status(400).json({ error: "Sorry, this user already exists" })
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const uploadedUser = new User({ username, email, password: hashedPassword });
    await uploadedUser.save();
    res.status(201).json({ message: "User created successfully", "user_id": uploadedUser._id })
})

userRouter.post('/login', [
    body('email').optional().isEmail().withMessage('Invalid email format.'),
    body('username').optional().notEmpty().withMessage('Username must not be empty.'),
    body('password').notEmpty().withMessage('Password must not be empty.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array().map(err => err.msg).join(', ') });
    }

    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
        return res.status(400).json({ status: false, message: "Please make sure that you have submitted your password and either email or username." });
    }

    const user = await User.findOne({ $or: [{ email: email }, { username: username }] });
    if (!user) {
        return res.status(404).json({ status: false, message: "User with that email or username does not exist." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ status: false, message: "Password or email/username is wrong." });
    }
    console.log(user)
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ userId: user._id},process.env.JWT_SECRET2,{expiresIn:"1d"})

    res.cookie("jwt",refreshToken,{
        httpOnly:true,
        domain:undefined,
        secure:false,
        sameSite:"none",
        maxAge:24 * 60 * 60 * 1000
    })

    res.status(200).json({ status: true, message: "Login successful.", jwt: accessToken });
});

userRouter.get("/refresh",async (req,res)=>{
    console.log(req)
    console.log(req.cookies)
    const refreshToken = req.cookies?.jwt;
    if(!refreshToken){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const userT = jwt.verify(refreshToken,process.env.JWT_SECRET2)

        const accessToken = jwt.sign({ userId: userT._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
        return res.json({accessToken})
    }
    catch(e){
        res.status(500).json({message:"Server error"})
    }
})

userRouter.get('/logout',(res,req)=>{
    try{
        res.clearCookie("jwt")
        res.status(200).json({message:"Logged out Successfully"})
    }
    catch(e){
        res.status(500).json({message:"Server Error"})
    }
})
module.exports = userRouter