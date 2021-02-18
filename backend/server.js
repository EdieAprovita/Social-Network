const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const index = require('./routes/index')
const connectDB = require('./config/db')
const morgan = require('morgan')

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())

app.use('/', index)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)

module.exports = app
