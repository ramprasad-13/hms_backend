const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Replace with your own secret key (keep it secure)
const JWT_SECRET = process.env.JWT_SECRET; 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required!"
        });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Generate a JWT token with user ID and email
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour (adjust as needed)
        );

        res.status(200).json({
            token    // Send the JWT token to the client
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Login failed, please try again later"
        });
    }
});

module.exports = router;
