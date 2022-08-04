const api = require('../../services/api')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {

    let now_playing = false

    try{

        const {data} = await api.get('movie/popular', {
            params: {
                api_key: '52c666c7bba4767d261680869bdc65e5',
                language: 'pt-BR',
                page: 1
            }
         })

         res.render('index',{
            movies: data.results,
            now: now_playing
         })


    }catch(error){
        res.json(error)
    }
})

router.get('/movies/genre/:id', async (req, res) => {
    const { id } = req.params
    const { genero } = req.query 

    try {

        const {data} = await api.get(`discover/movie`, {
            params: {
                api_key: '52c666c7bba4767d261680869bdc65e5',
                with_genres : id,
                language: 'pt-BR',
                page: 1
            }
        })
    
        res.render('movies/moviesByGenre', {
            movies: data.results,
            genero: genero
        })
        
    } catch (error) {
        res.json(error)
    }

    
     
})

router.get('/movies/now_playing', async (req, res) => {

    let now_playing = true

    try{

        const {data} = await api.get('movie/now_playing', {
            params: {
                api_key: '52c666c7bba4767d261680869bdc65e5',
                language: 'pt-BR',
                page: 1
            }
         })

         res.render('index',{
            movies: data.results,
            now: now_playing
         })


    }catch(error){
        res.json(error)
    }

})


router.get('/movie/details/:id', async (req, res) => {
    const { id } = req.params

    try {

        const {data} = await api.get(`movie/${id}`, {
            params: {
                api_key: '52c666c7bba4767d261680869bdc65e5',
                language: 'pt-BR'
            }
        })

    
        res.render('movies/movieDetails', {
            movie: data
        })

        
    } catch (error) {
        res.json(error)
    }

    
     
})
module.exports = router
