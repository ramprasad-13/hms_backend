const Patient = require('../models/Patient');

// Create a new patient
const createPatient = async (req, res) => {
    const { role } = req.user;
    if (!(role === 'doctor' || role === 'receptionist')) {
        return res.status(400).json({
            message: 'You are not authorized to add a patient.'
        });
    }

    const {
        fullName,
        phoneNumber,
        gender,
        age,
        address,
        appointmentDate,
        medicationCause,
        prescription,
        tests
    } = req.body;

    // Validate required fields
    if (!fullName || !phoneNumber || !gender || !age || !address || !appointmentDate) {
        return res.status(400).json({
            message: 'All fields are required.'
        });
    }

    try {
        // Check if the patient already exists (based on full name and phone number)
        const existingPatient = await Patient.findOne({ fullName, phoneNumber });
        if (existingPatient) {
            return res.status(400).json({
                message: 'Patient already exists!'
            });
        }

        // Create a new patient
        const newPatient = new Patient({
            fullName,
            phoneNumber,
            gender,
            age,
            address,
            appointmentDate,
            medication: {
                cause: medicationCause || '',
                prescription: prescription || '',
                tests: tests || ''
            }
        });

        // Save the new patient to the database
        await newPatient.save();

        return res.status(201).json({
            message: 'Patient added successfully!',
            patient: newPatient
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add patient.' });
    }
};

module.exports = createPatient;
