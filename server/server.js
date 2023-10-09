const path = require('path')
const express = require('express')

const events = require('./events')
const students = require('./students')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1/events', events)
server.use('/api/v1/students', students)
//organise routes more

module.exports = server
