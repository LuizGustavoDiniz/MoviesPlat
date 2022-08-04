const express = require('express')
const app = express()
const port = 3000
const allMovieController = require('./controllers/movies/allMoviesController')
const allSeriesController = require('./controllers/series/allSeriesController')


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/', allMovieController)
app.use('/', allSeriesController)



app.listen(port, () => {
    console.log('Server running on port ' + port)
})