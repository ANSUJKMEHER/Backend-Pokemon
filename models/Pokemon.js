const mongoose = require('mongoose');
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