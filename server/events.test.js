const db = require('./db/db')
const request = require('supertest')
const server = require('./server')

jest.mock('./db/db')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

describe('GET last sessions', () => {
  test('returns last session from db', () => {
    let id = 3
    const mockSessionData = [
      { id: 5, name: 'Summer Lovin' },
      { id: 6, name: 'Winter Chills' },
      { id: 7, name: 'Autum Blues' },
    ]
    expect.assertions(1)
    db.getLastSessionById.mockReturnValue(Promise.resolve(mockSessionData))
    return request(server)
      .get(`/api/v1/events/${id}`)
      .then((res) => {
        expect(res.body[0].id).toBe(5)

        return null
      })
  })

  test('getLastSession reject', () => {
    db.getLastSessionById.mockImplementation(() =>
      Promise.reject(new Error('test error message'))
    )

    console.error.mockImplementation(() => {})
    return request(server)
      .get('/api/v1/sessions/3')
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

describe('Post a session /api/v1/sessions', () => {
  test('Posts a sessions and returns the session details', () => {
    const mockPostSessionData = [
      {
        start: '22-10-02',
        end: '06:04',
        name: 'lil jimmy',
        studentId: 7,
        studentNotes: 'Hello',
        teacherId: 2,
        teacherNotes: 'Goodbye',
      },
    ]

    const mockReturnObject = [
      {
        start: '22-10-02',
        end: '06:04',
        student_id: 7,
        studentNotes: 'Hello',
        teacher_id: 2,
        teacherNotes: 'Goodbye',
      },
    ]

    expect.assertions(1)
    db.addSessions.mockReturnValue(Promise.resolve(mockPostSessionData))
    return request(server)
      .post('/api/v1/sessions')
      .send(mockPostSessionData)
      .then((res) => {
        expect(res.body).toBe(mockReturnObject)
      })
  })

  test('addSessions reject', () => {
    db.addSessions.mockImplementation(() =>
      Promise.reject(new Error('test error message'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .post('/api/v1/sessions')
      .then((res) => {
        expect(res.status).toBe(500)
        // expect(console.error).toHaveBeenCalledWith('test error message')
        return null
      })
  })
})
