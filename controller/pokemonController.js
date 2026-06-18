const Pokemon = require('../models/Pokemon');

/**
 * Adds a new pokemon to the database.
 * Expects pokemon details in the request body and an image file.
 */
exports.addpokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.create({
            name: req.body.name,
            level: req.body.level,
            description: req.body.description,
            image: req.file.path // Image path from multer
        });

        res.status(201).json({
            message: 'Pokemon added successfully.',
            pokemon
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to add pokemon.',
            error: err.message
        });
    }
};

/**
 * Retrieves all pokemon from the database.
 */
exports.getall = async (req, res) => {
    try {
        const pokemonList = await Pokemon.find();
        res.status(200).json({
            message: 'Retrieved details of all pokemon.',
            pokemon: pokemonList
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to retrieve pokemon.',
            error: err.message
        });
    }
};

/**
 * Retrieves a single pokemon by its ID.
 */
exports.getbyid = async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id);

        if (!pokemon) {
            return res.status(404).json({
                message: 'Pokemon not found.'
            });
        }

        res.status(200).json({
            message: 'Retrieved pokemon details.',
            pokemon
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to retrieve pokemon.',
            error: err.message
        });
    }
};