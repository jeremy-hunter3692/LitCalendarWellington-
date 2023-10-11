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

// describe('GET last sessions /api/v1/s', () => {
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

describe('adds events', () => {
  test('posts events to the sever', () => {
    const mockPostSessionData = [
      {
        start: '22-10-02',
        end: '06:04',
        name: 'lil jimmy',
        studentId: 7,
        studentNotes: 'Hello',
        teacherId: 2,
        teacherNotes: 'Goodbye',
        modNotes: { conatact: 'blah', otherthing: 'blach' },
      },
    ]

    const mockReturnObject = [
      {
        start: '22-10-02',
        end: '06:04',
        studentId: 7,
        studentNotes: 'Hello',
        teacherNotes: 'Goodbye',
      },
    ]

    expect.assertions(2)
    db.addEvents.mockReturnValue(Promise.resolve(mockReturnObject))
    return request(server)
      .post('/api/v1/events')
      .send(mockPostSessionData)
      .then((res) => {
        console.log('restest', res.body)
        expect(res.body).toEqual(mockReturnObject)
        expect(res.body).not.toContain(mockReturnObject.modnotes)
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
