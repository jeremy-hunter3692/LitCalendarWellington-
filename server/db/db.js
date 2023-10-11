const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function getAllEvents(db = connection) {
  return db('events').select()
}

function updateEventById(id, changes, db = connection) {
  console.log(id,changes)
  return db('events').where('id', id).update(changes)
}

function getEventById(id, db = connection) {
  return db('events').where('id', id).select().first()
}

function addEvents(info, db = connection) {
  return db('events').insert(info)
}

module.exports = {
  addEvents,
  getEventById,
  getAllEvents,
  updateEventById,
}
