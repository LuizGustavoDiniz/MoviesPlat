const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')
const fileStore = require('session-file-store')(session)
const port = 3000
const moviesRoutes = require('./routes/moviesRoutes')
const seriesRoutes = require('./routes/seriesRoutes')

const userModel = require('./models/User')
const connection = require('./Database/database')


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    name: "session",
    secret: "my_secret",
    resave: false,
    saveUninitialized: false,
    store: new fileStore({
        logFn: function(){},
        path: require('path').join(require('os').tmpdir(), "sessions")
    }),
    cookie: {
        secure: false,
        maxAge: 86400000,
        expires: new Date(Date.now() + 86400000),
        httpOnly: true
    }
}))

app.use(flash())


app.use((req, res, next) => {
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})


app.use('/movies', moviesRoutes)
app.get('/', (req, res) => {
    res.redirect('/movies')
})
app.use('/series', seriesRoutes)



connection.sync({force:false}).then(() => {

    app.listen(port, () => {
        console.log('Server running on port ' + port)
    })

}).catch(err => {
    console.log('something error' + err)
})

