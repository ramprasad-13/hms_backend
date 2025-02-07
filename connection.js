const mongoose = require('mongoose')
require('dotenv').config();
const URI = process.env.MONGO_URI;

const connectDB = async()=>{
    try {
    await mongoose.connect(URI);
    console.log('App connected Sucessfully');
} catch (error) {
    return error
}
}

module.exports= connectDB;