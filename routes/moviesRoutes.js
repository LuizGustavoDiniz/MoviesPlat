const express = require('express')
const router = express.Router()
const MoviesController = require('../controllers/movies/MoviesController')
const authentication = require('../helpers/authentication').authentication

router.get('/', authentication, MoviesController.showMovies)

router.get('/genre/:id', authentication, MoviesController.moviesGenres)

router.get('/now_playing', authentication, MoviesController.nowPlayingMovies)

router.get('/details/:id', authentication, MoviesController.movieDetails)


module.exports = router