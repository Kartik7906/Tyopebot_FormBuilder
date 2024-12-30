const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/UserSchema');
const dotenv = require('dotenv');
dotenv.config();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const user = await User.create({ username, email, password: hashedPassword, confirmPassword });
        res.status(201).json({ message: 'User created successfully', user, userId: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
        user: {
            id: user._id
        }
    }
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
        message: 'User logged in successfully',
        token: token,
        userId: user._id,
        username: user.username
    });
});



module.exports = router;