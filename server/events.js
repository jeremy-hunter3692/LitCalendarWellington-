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

router.put('/:id', (req, res) => {
  const {id} = req.params
  const update = req.body
  console.log('id', id, update)
  db.updateEventById(id, update)
    .then((data) => {
      console.log('event', data)
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
    x = {
      ...x,
      ...x.modNotes,
    }
    delete x.modNotes
    return x
  })

  if (typeof fixedEvents[0].modNotes != 'undefined') {
    console.log('if', fixedEvents.modNotes)
    res.status(400)
  }
  // console.log({ fixedEvents })
  db.addEvents(fixedEvents)
    .then((anything) => {
      res.send(fixedEvents)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong not added' })
    })
})

module.exports = router
