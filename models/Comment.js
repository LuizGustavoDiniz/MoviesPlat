const { DataTypes } = require('sequelize')
const connection = require('../Database/database')

const Comment = connection.define('comments', {
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        require: true
    }
})


module.exports = Comment