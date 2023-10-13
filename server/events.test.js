const db = require('./db/db')
const request = require('supertest')
const server = require('./server')

jest.mock('./db/db')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

describe('gets all events', () => {
  test('returns events', () => {
    const mockSessionData = [
      { id: 5, name: 'Summer Lovin' },
      { id: 6, name: 'Winter Chills' },
      { id: 7, name: 'Autum Blues' },
    ]
    // expect.assertions(1)
    db.getAllEvents.mockReturnValue(Promise.resolve(mockSessionData))
    return request(server)
      .get('/api/v1/events')
      .then((res) => {
        expect(res.body).toEqual(mockSessionData)
        return null
      })
  })

  test('gets all events fail', () => {
    db.getAllEvents.mockImplementation(() =>
      Promise.reject(new Error('test error message'))
    )

    console.error.mockImplementation(() => {})
    return request(server)
      .get('/api/v1/events')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('test error message')
        return null
      })
  })
})

// describe('Get event by id /api/v1/:id', () => {
//   test('returns last session from db', () => {
//     const mockSessionData = [
//       { id: 5, name: 'Summer Lovin' },
//       { id: 6, name: 'Winter Chills' },
//       { id: 7, name: 'Autum Blues' },
//     ]
//     expect.assertions(1)
//     db.getLastSessionById.mockReturnValue(Promise.resolve(mockSessionData))
//     return request(server)
//       .get('/api/v1/sessions')
//       .then((res) => {
//         // console.log(res.body)
//         expect(res.body[0].id).toBe(5)

//         return null
//       })
//   })
// })
describe('update an event', () => {
  test('updates event by id', () => {
    const id = 1
    const updated = { title: 'updated Title', id: id }

    db.updateEventById.mockReturnValue(Promise.resolve(updated))
    return request(server)
      .put(`/api/v1/events/${id}`)
      .send([updated])
      .then((res) => {
        expect(res.body).toEqual(updated)
        expect(res.body.id).toEqual(id)
        expect(res.status).toBe(200)
        return null
      })
  })
})

describe('adds events', () => {
  test('posts events to the server without modnotesobj', () => {
    const mockPostSessionData = [
      {
        start: '22-10-02',
        end: '06:04',
        name: 'lil jimmy',
        studentId: 7,
        studentNotes: 'Hello',
        teacherId: 2,
        teacherNotes: 'e',
        modNotes: { contact: 'blah', otherthing: 'whoop' },
      },
    ]

    const mockReturnObject = [
      {
        start: '22-10-02',
        end: '06:04',
        name: 'lil jimmy',
        studentId: 7,
        studentNotes: 'Hello',
        teacherId: 2,
        teacherNotes: 'e',
      },
    ]

    // expect.assertions(2)
    db.addEvents.mockReturnValue(Promise.resolve(mockReturnObject))
    return request(server)
      .post('/api/v1/events')
      .send(mockPostSessionData)
      .then((res) => {
        // console.log('restest', res.body)
        // console.log('str', typeof res.body[0].modNotes === 'undefined')
        expect(typeof res.body[0].modNotes === 'undefined').toBeTruthy()
        expect(res.body[0].contact).toBe('blah')
        expect(res.body[0].otherthing).toBe('whoop')
        expect(res.status).not.toBe(400)
      })
  })

  test('addsEvents reject', () => {
    db.addEvents.mockImplementation(() =>
      Promise.reject(new Error('test error message'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .post('/api/v1/events')
      .then((res) => {
        expect(res.status).toBe(500)
        // expect(console.error).toHaveBeenCalledWith('test error message')
        return null
      })
  })
})
