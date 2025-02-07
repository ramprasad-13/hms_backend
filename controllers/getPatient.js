const Patient = require('../models/Patient');

// Get a specific patient by ID
const getPatient= async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.status(200).json({ patient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch patient.' });
    }
};

module.exports = getPatient;