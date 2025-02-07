const express = require('express');
const router = express.Router();

const testRoute = require('./controllers/testRoute')
router.get('/test',testRoute);

//add Patients
const createPatient = require('./controllers/createPatient');
router.post('/patient/create',createPatient);
//delete Patients
const deletePatient = require('./controllers/deletePatient');
router.delete('/patient/delete/:id',deletePatient);
//update Patients
const updatePatient = require('./controllers/updatePatient');
router.put('/patient/update/:id',updatePatient);
//Read Patients
const getPatient = require('./controllers/getPatient');
router.get('/patient/:id',getPatient);
//Get all Patients
const getAllPatients = require('./controllers/getAllPatients');
router.get('/patient',getAllPatients);


//staff Routes
const createStaff= require('./controllers/createStaff');
router.post('/staff/create',createStaff);

const getStaff = require('./controllers/getStaff');
router.get('/staff/:id',getStaff);

const getAllStaff = require('./controllers/getAllStaff');
router.get('/staff',getAllStaff);

const updateStaff = require('./controllers/updateStaff');
router.put('/staff/update/:id',updateStaff);

const deleteStaff = require('./controllers/deleteStaff');
router.delete('/staff/delete/:id',deleteStaff);

module.exports = router;