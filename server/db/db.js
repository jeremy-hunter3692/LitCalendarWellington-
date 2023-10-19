const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function getAllEvents(db = connection) {
  return db('events').select()
}

function updateEventById(id, changes, db = connection) {
  // console.log(id, changes)
  return db('events').where('id', id).update(changes)
}

function getEventById(id, db = connection) {
  return db('events').where('id', id).select().first()
}

function addEvents(info, db = connection) {
  return db('events').insert(info)
}

function deleteEvent(id, db = connection) {
  return db('events').where('id', id).del()
}
function deleteEventsArray(idArray, db = connection) {
  return db('events').whereIn('id', idArray).del()
}

module.exports = {
  addEvents,
  getEventById,
  getAllEvents,
  updateEventById,
  deleteEvent,
  deleteEventsArray,
}
