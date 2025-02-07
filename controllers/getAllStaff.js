const User = require('../models/User');

const getAllStaff = async (req, res) => {
    if(req.user.role!=='doctor'){
        return res.status(403).json({
            message:'You are not authorized to See Staff!'
        })
    }
    

    // Check if the user already exists
    const findUsers = await User.find({});

    try {
        res.status(200).json(findUsers);   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server error"
        });
    }
};

module.exports = getAllStaff;
