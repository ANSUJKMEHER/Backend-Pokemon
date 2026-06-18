const mongoose = require('mongoose');

/**
 * Connects to the MongoDB database.
 * Uses the provided connection string to establish a connection.
 */
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://ansujkmeher_db_user:Ansuj123@cluster0.5on3jdo.mongodb.net/?appName=Cluster0');
        console.log('Database connected successfully.');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit process with failure if DB connection fails
    }
};

module.exports = connectDb;
