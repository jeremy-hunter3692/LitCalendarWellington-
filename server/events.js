const express = require('express')
const router = express.Router()
const db = require('./db/db')

function deleteModNotes(arrIn) {
  return arrIn.map((x) => {
    x = {
      ...x,
      ...x.modNotes,
    }
    delete x.modNotes
    return x
  })
}

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
  const { id } = req.params
  const update = req.body
  const fixedEvents = deleteModNotes(update)
  // console.log('fixed events', fixedEvents)
  db.updateEventById(id, fixedEvents[0])
    .then((data) => {
      res.status(200).send(fixedEvents[0])
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/', (req, res) => {
  //go back and fix camel case on extranotes?
  const fixedEvents = deleteModNotes(req.body)

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

router.delete('/:id', (req, res) => {
  const { id } = req.params
  console.log('id', id)
  db.deleteEvent(id)
    .then((res) => {
      res.send(`item with id:${id} deleted`)
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong' })
      console.error(err.message)
    })
})

router.post('/delete', (req, res) => {
  const eventArrayToDelete = req.params.body
  db.deleteEventsArray(eventArrayToDelete)
    .then((data) => {
      // console.log({ data })
      res.send(data)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong ' })
    })
})

module.exports = router
