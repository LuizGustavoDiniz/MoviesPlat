const { DataTypes } = require('sequelize')
const connection = require('../Database/database')

const User = connection.define('Users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
})


module.exports = User