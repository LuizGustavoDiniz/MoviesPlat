const express = require('express')
const router = express.Router()
const MoviesController = require('../controllers/movies/MoviesController')

router.get('/', MoviesController.showMovies)

router.get('/genre/:id', MoviesController.moviesGenres)

router.get('/now_playing', MoviesController.nowPlayingMovies)

router.get('/details/:id', MoviesController.movieDetails)


module.exports = router