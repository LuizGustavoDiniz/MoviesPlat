const api = require('../../services/api')

module.exports = class MoviesController{

   static async showMovies(req, res){

    let page = 1

    let next = Number(req.query.next)

    let prev = Number(req.query.prev)

    if(!req.query.next && !req.query.prev){
        page = 1;
    }

    if(req.query.next){
        page = next
    }

    if(req.query.prev === true && prev >= 1){
        page = next - 1
    }

    
    let now_playing = false

    try{

        const {data} = await api.get('movie/popular', {
            params: {
                api_key: '52c666c7bba4767d261680869bdc65e5',
                language: 'pt-BR',
                page: page
            }
         })

         res.render('home',{
            movies: data.results,
            now: now_playing,
            page: data.page
         })


    }catch(error){
        res.json(error)
    }
   }

   static async moviesGenres(req, res){
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
   }

   static async nowPlayingMovies(req, res){
    let now_playing = true

    try{

        const {data} = await api.get('movie/now_playing', {
            params: {
                api_key: '52c666c7bba4767d261680869bdc65e5',
                language: 'pt-BR',
                page: 1
            }
         })

         res.render('home',{
            movies: data.results,
            now: now_playing
         })


    }catch(error){
        res.json(error)
    }
   }

   static async movieDetails(req, res){
    
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

   }

   static async comment(req, res){
    res.render('movies/comment')
   }

}


