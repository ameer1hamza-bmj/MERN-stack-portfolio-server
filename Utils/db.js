const mongoose = require('mongoose');


const URI = process.env.MONGODB_URI
const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log('Database connection successfull');

    } catch (error) {
        console.log('Database Connection failed');
        process.exit(0)
    }
}

module.exports = connectDB
