const api = require('../../services/api')

module.exports = class SeriesController {

    static async showSeries(req, res){
      
        try{

            const {data} = await api.get('tv/popular', {
                params: {
                    api_key: '52c666c7bba4767d261680869bdc65e5',
                    language: 'pt-BR',
                    page: 1
                }
             })
           
    
             //console.log(data)
             res.render('series/index', {
                series: data.results
             })
    
             //res.json(data.results)
    
        }catch(error){
            res.json({error: error})
        }

    }

    static async bestSeries(req, res) {

        try{

            const {data} = await api.get('tv/popular', {
                params: {
                    api_key: '52c666c7bba4767d261680869bdc65e5',
                    language: 'pt-BR',
                    page: 1
                }
             })
           
    
             //console.log(data)
             res.render('series/index', {
                series: data.results
             })
    
             //res.json(data.results)
    
        }catch(error){
            res.json({error: error})
        }

    }

}
