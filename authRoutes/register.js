const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { email, password, phoneNumber, fullName, role } = req.body;

    // Check if all fields are provided
    if (!email || !password || !phoneNumber || !fullName || !role) {
        return res.status(400).json({
            message: "All the fields are required!"
        });
    }

    // Check if the user already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            phoneNumber,
            fullName,
            role
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({
            message: `Hi ${user.fullName} your account created successfully!`
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Registration was unsuccessful"
        });
    }
});

module.exports = router;
