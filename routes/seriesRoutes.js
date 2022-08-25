const express = require('express')
const router = express.Router()
const SeriesController = require('../controllers/series/SeriesController')

router.get('/', SeriesController.showSeries)

router.get('/best', SeriesController.bestSeries)

module.exports = router