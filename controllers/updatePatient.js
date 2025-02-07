const Patient = require('../models/Patient');

const updatePatient = async (req, res) => {
    const { role } = req.user;
    if (!(role === 'doctor' || role === 'receptionist')) {
        return res.status(400).json({
            message: 'You are not authorized to update patient information.'
        });
    }

    const patientId = req.params.id;
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

    try {
        // Find the patient by ID
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        // Update the patient's information
        patient.fullName = fullName || patient.fullName;
        patient.phoneNumber = phoneNumber || patient.phoneNumber;
        patient.gender = gender || patient.gender;
        patient.age = age || patient.age;
        patient.address = address || patient.address;
        patient.appointmentDate = appointmentDate || patient.appointmentDate;
        patient.medication.cause = medicationCause || patient.medication.cause;
        patient.medication.prescription = prescription || patient.medication.prescription;
        patient.medication.tests = tests || patient.medication.tests;

        // Save the updated patient
        await patient.save();

        return res.status(200).json({
            message: 'Patient updated successfully!',
            patient: patient
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update patient.' });
    }
};

module.exports = updatePatient;
