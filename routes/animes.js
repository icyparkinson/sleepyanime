const express = require('express')
const router = express.Router()
const animesController = require('../controllers/animes') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, animesController.getAnime)

router.post('/addAnime', animesController.addAnime)

router.delete('/deleteAnime', animesController.deleteAnime)

module.exports = router