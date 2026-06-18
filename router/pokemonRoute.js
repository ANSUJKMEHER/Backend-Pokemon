const express = require('express');
const multer = require('multer');
const { addpokemon, getall, getbyid } = require('../controller/pokemonController');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


router.post('/add/pokemon', upload.single('image'), addpokemon);
router.get('/get/pokemon', getall);
router.get('/get/pokemon/:id', getbyid);

module.exports = router;