const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female','other'],
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:Date,
        default:()=> Date.now(),
        required:true
    },
    medication:{
        cause:{
            type:String,
            default:"",
        },
        prescription:{
            type:String,
            default:""
        },
        tests:{
            type:[String],
            default:""
        }
    }
    
});

// Use mongoose.model() to prevent overwriting an already compiled model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
