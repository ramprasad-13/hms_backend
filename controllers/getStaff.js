const User = require('../models/User');

const getStaff = async (req, res) => {
    if(req.user.role!=='doctor'){
        return res.status(403).json({
            message:'You are not authorized to See Staff!'
        })
    }
    
    const {id}= req.params;

    // Check if the user already exists
    const findUser = await User.findById(id);
    if (!findUser) {
        return res.status(400).json({
            message: "User Not exists"
        });
    }
    try {
        res.status(200).json(findUser);   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server error"
        });
    }
};

module.exports = getStaff;
