const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['doctor', 'receptionist', 'pharamacist'],
        required: true
    }
});

// Use mongoose.model() to prevent overwriting an already compiled model
const User = mongoose.model('User', userSchema);

module.exports = User;
