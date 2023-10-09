const express = require('express')
const router = express.Router()
const db = require('./db/db')

router.get('/', (req, res) => {
  db.getAllEvents()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  db.getEventById(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/', (req, res) => {
  //Matching/changing key names to databse key names

  const sessions = req.body
  // sessions.forEach((x) => {
  //   x.student_id = Number(x.studentId)
  //   x.teacher_id = x.teacherId
  //   delete x.name
  //   delete x.studentId
  //   delete x.teacherId
  //   delete x.instrument
  //   delete x.title
  // })
  db.addEvents(sessions)
    .then((sessions) => {
      res.send(sessions)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong not added' })
    })
})

module.exports = router
