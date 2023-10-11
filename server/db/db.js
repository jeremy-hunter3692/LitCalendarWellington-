const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function getAllEvents(db = connection) {
  return db('events').select()
}

function getEventById(id, db = connection) {
  return db('sessions').where('id', id).select().first()
}

function addEvents(info, db = connection) {
  console.log('in', info)
  return db('events').insert(info)
}

module.exports = {
  addEvents,
  getEventById,
  getAllEvents,
}
