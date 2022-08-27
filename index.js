const express = require('express')
const path = require('path')
const os = require('os')

const session = require('express-session')
const flash = require('express-flash')
const fileStore = require('session-file-store')(session)
const port = 3000
const moviesRoutes = require('./routes/moviesRoutes')
const seriesRoutes = require('./routes/seriesRoutes')
const authRoutes = require('./routes/authRoutes')

const userModel = require('./models/User')
const app = express()
const connection = require('./Database/database')



app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new fileStore({
        logFn: function(){},
        path: path.join(os.tmpdir(), "sessions")
    }),
    cookie: {
        secure: false,
        maxAge: 86400000,
        expires: new Date(Date.now() + 86400000),
        httpOnly: true
    }
}))

app.use(flash())

app.use(express.static('public'))

app.use((req, res, next) => {
    
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})



app.use('/movies', moviesRoutes)
app.use('/series', seriesRoutes)
app.use('/', authRoutes)


app.get('/', (req, res) => {
    res.redirect('/login')
})




connection.sync({force:false}).then(() => {

    app.listen(port, () => {
        console.log('Server running on port ' + port)
    })

}).catch(err => {
    console.log('something error' + err)
})

