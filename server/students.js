const express = require('express')
const router = express.Router()
const db = require('./db/db')

router.get('/', (req, res) => {
  db.getAllStudents()
    .then((students) => {
      res.send(students)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong not added' })
    })
})

module.exports = router
