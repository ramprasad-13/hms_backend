const Patient = require('../models/Patient');

// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json({
            patients
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch patients.' });
    }
};

module.exports = getAllPatients;