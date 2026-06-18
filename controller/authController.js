const User = require('../models/Auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
       
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User is already registered.'
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

       
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

   
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

exports.login = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found.'
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid password.'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            'mykeypswrd',
            { expiresIn: '7d' }
        );

      
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