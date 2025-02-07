const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Update staff endpoint
const updateStaff = async (req, res) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({
      message: 'You are not authorized to update staff!'
    });
  }

  const { id } = req.params;
  const { email, password, phoneNumber, fullName, role } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Id is required to update the staff!"
    });
  }

  try {
    // Find the staff member by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Update fields only if they are provided
    if (email) user.email = email;
    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (role) user.role = role;

    // If password is provided, hash and update it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated staff member
    await user.save();

    res.status(200).json({
      message: `User ${user.fullName}'s account has been successfully updated!`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the staff."
    });
  }
};

module.exports = updateStaff;
