const express = require('express');
const connectDb = require('./config/db');

const Pokemon = require('./models/Pokemon');
const pokemonRoute = require('./router/pokemonRoute');
const authRoute = require('./router/authRouter');

const app = express();
const PORT = 3002;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to the database
connectDb();

// Register application routes
app.use('/api/v1', pokemonRoute);
app.use('/auth', authRoute);

// Basic health check route
app.get('/', (req, res) => {
    res.send('Server is working');
});

/**
 * Pokemon Routes (Directly in index.js)
 * Note: These could ideally be moved to pokemonController/pokemonRoute.
 */

// Update pokemon data
app.put('/update/pokemon/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found.' });
        }

        res.status(200).json({
            message: 'Pokemon updated successfully.',
            pokemon
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while updating the pokemon.',
            error: err.message
        });
    }
});

// Delete a pokemon
app.delete('/del/pokemon/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
        
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found.' });
        }

        res.status(200).json({
            message: 'Pokemon deleted successfully.'
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while deleting the pokemon.',
            error: err.message
        });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server started and listening on port ${PORT}`);
});