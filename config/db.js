const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://ansujkmeher_db_user:Ansuj123@cluster0.5on3jdo.mongodb.net/?appName=Cluster0');
        console.log('Database connected successfully.');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); 
    }
};

module.exports = connectDb;
