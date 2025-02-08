const Patient = require('../models/Patient');

// Get all patients with search and date filters
const getAllPatients = async (req, res) => {
    try {
        const { name, phoneNumber, startDate, endDate } = req.query;

        // Building query filters
        let query = {};

        // Search by name (case-insensitive)
        if (name) {
            query.fullName = { $regex: name, $options: 'i' };  // 'i' for case-insensitive search
        }

        // Search by phone number
        if (phoneNumber) {
            query.phoneNumber = phoneNumber;
        }

        // Filter by appointment date range
        if (startDate && endDate) {
            query.appointmentDate = {
                $gte: new Date(startDate), // Greater than or equal to startDate
                $lte: new Date(endDate)    // Less than or equal to endDate
            };
        }

        // Fetch the filtered patients from the database
        const patients = await Patient.find(query);

        // Return the filtered patients
        res.status(200).json({
            patients
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch patients.' });
    }
};

module.exports = getAllPatients;
