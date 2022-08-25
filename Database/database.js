const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('moviesplat', 'root', '3532gustavo', {
    host: 'localhost',
    dialect: 'mysql'
})


try {
    
    sequelize.authenticate()
    console.log('Database sucessfully connected!')

} catch (error) {
    console.log('something error' + error)
}

module.exports = sequelize