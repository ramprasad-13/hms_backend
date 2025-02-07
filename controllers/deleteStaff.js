const User = require('../models/User');

const deleteStaff = async (req, res) => {
    if(req.user.role!=='doctor'){
        return res.status(403).json({
            message:'You are not authorized to Delete Staff!'
        })
    }
    
    const { id } = req.params;  // We're assuming the id is passed as a URL parameter

    // Check if email is provided
    if (!id) {
        return res.status(400).json({
            message: "Id is required to delete the staff!"
        });
    }

    try {
        // Find the user by email
        const user = await User.findById(id);

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        // Delete the user from the database
        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: `User has been deleted successfully!`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while deleting the staff."
        });
    }
};

module.exports = deleteStaff;
