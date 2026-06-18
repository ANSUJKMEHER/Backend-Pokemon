const mongoose = require('mongoose');

// Define the schema for Pokemon details
const pokemonSchema = new mongoose.Schema({
    name: {
        type: String
    },
    level: {
        type: Number
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Pokemon', pokemonSchema);