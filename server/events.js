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
  //go back and fix camel case on extranotes?
  const events = req.body
  const fixedEvents = events.map((x) => {
    x = { ...x, ...x.modNotes }
    delete x.modNotes
    return x
  })
  console.log('fixed', fixedEvents)
  db.addEvents(fixedEvents)
    .then((events) => {
      res.send(events)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong not added' })
    })
})

module.exports = router
