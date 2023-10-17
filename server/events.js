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
  console.log('update', update, 'id', id)
  const fixedEvents = deleteModNotes(update)
  console.log('fixed events', fixedEvents)
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

router.delete('/:id', (res, req) => {
  // console.log('s', req.body)
  const { id } = req.params
  console.log('server route', id)
  db.deleteEvents(id)
    .then((res) => {
      res.send
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong ' })
    })
})

module.exports = router
