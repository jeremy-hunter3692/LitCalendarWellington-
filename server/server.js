const path = require('path')
const express = require('express')

const sessions = require('./sessions')
const students = require('./students')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1/sessions', sessions)
server.use('/api/v1/students', students)
//organise routes more

module.exports = server
