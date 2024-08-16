const asyncHandler = require('express-async-handler'); // Ensure asyncHandler is imported
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
//@desc Register A User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }
    
    // Check if user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    
    if (user) {
        return res.status(201).json({
            _id: user.id, 
            email: user.email
        });
    } else {
        return res.status(400).json({ message: "User data is not valid" });
    }
});


//@desc Login A User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
 
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }
 
    const user = await User.findOne({ email });
 
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
 
        return res.status(200).json({ accessToken });
    } else {
        return res.status(401).json({ message: "Email or password is not valid" });
    }
 });
 

//@desc Current User
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user data " }); // Modified message for clarity
});

module.exports = { registerUser, loginUser, currentUser };
