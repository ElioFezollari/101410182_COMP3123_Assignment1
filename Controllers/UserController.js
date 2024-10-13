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

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1800s' });

    res.status(200).json({ status: true, message: "Login successful.", jwt: jwtToken });
});
module.exports = userRouter