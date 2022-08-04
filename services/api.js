const axios = require('axios')

//Base url = https://api.themoviedb.org/3/

//api = movie/now_playing?api_key=52c666c7bba4767d261680869bdc65e5&language=pt-BR

const api = axios.create({
   baseURL : 'https://api.themoviedb.org/3/'
})

module.exports = api