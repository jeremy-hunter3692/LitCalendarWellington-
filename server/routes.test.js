const db = require('./db/db')
const request = require('supertest')
const server = require('./server')

jest.mock('./db/db')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

describe('GET last sessions /api/v1/sessions', () => {
  test('returns last session from db', () => {
    const mockSessionData = [
      { id: 5, name: 'Summer Lovin' },
      { id: 6, name: 'Winter Chills' },
      { id: 7, name: 'Autum Blues' },
    ]
    expect.assertions(1)
    db.getLastSession.mockReturnValue(Promise.resolve(mockSessionData))
    return request(server)
      .get('/api/v1/sessions')
      .then((res) => {
        expect(res.body[0].id).toBe(5)

        return null
      })
  })
})

describe('Post a session /api/v1/sessions', () => {
  test('Posts a sessions and returns the session details', () => {
    const mockPostSessionData = {
      date: '22-10-02',
      hour: '06:04',
      name: 'lil jimmy',
      studentId: 7,
      studentNotes: 'Hello',
      teacherId: 2,
      teacherNotes: 'Goodbye',
    }

    const mockReturnObject = {
      date: '22-10-02',
      hour: '06:04',
      student_id: 7,
      studentNotes: 'Hello',
      teacher_id: 2,
      teacherNotes: 'Goodbye',
    }

    // expect.assertions(1)
    db.addSession.mockReturnValue(Promise.resolve(mockPostSessionData))
    return request(server)
      .post('/api/v1/sessions')
      .send(mockPostSessionData)
      .then((res) => {
        expect(res.body).toEqual(mockReturnObject)
        console.log('from test', res.body)
      })
  })
})
