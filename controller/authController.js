const User = require('../models/Auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Handles user registration.
 * Checks if the user already exists, hashes the password, and creates a new user.
 */
exports.register = async (req, res) => {
    try {
        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User is already registered.'
            });
        }

        // Hash the user's password for security
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the new user in the database
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        // Respond with success
        res.status(201).json({
            message: 'Registration successful.',
            user
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred during registration.',
            error: err.message
        });
    }
};

/**
 * Handles user login.
 * Verifies credentials and issues a JSON Web Token (JWT) for authenticated access.
 */
exports.login = async (req, res) => {
    try {
        // Find the user by their email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found.'
            });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid password.'
            });
        }

        // Generate a JWT for the authenticated user
        const token = jwt.sign(
            { id: user._id },
            'mykeypswrd',
            { expiresIn: '7d' }
        );

        // Respond with the token
        res.json({
            message: 'Login successful.',
            token
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred during login.',
            error: err.message
        });
    }
};