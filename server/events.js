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
  //go back and fix camel case on extranotes?
  const events = req.body
  function unpackModNotes(inputObj) {
    // console.log('in func', inputObj)
    inputObj.contact = inputObj.modNotes.contact
    inputObj.alternativeContact = inputObj.modNotes.alternativeContact
    inputObj.organisation = inputObj.modNotes.organisation
    inputObj.extranotes = inputObj.modNotes.extranotes
    delete inputObj.modNotes
    return inputObj
  }

  const fixedEvents = events.map((x) => unpackModNotes(x))
  // console.log('fixed', fixedEvents)
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
