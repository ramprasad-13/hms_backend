const Patient = require('../models/Patient');

// Delete patient by ID
const deletePatient = async (req, res) => {
    
    const {role}= req.user;
    if(!(role==='doctor' || role==='receptionist')){
        return res.status(400).json({
            message:'You are not Authorized to Delete Patient.'
        })
    }

    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        await Patient.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Patient deleted successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete patient.' });
    }
};
module.exports = deletePatient;