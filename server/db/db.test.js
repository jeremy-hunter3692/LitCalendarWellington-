const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const { getLastSessionById, getAllStudents, addSessions } = require('./db.js')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getLastSession', () => {
  test('gets last session from the database', () => {
    const id = 8
    expect.assertions(1)
    return getLastSessionById(id, testDb).then((sessions) => {
      expect(sessions.id).toBe(8)
    })
  })
})
describe('getAllStudents', () => {
  test('gets students from the database', () => {
    expect.assertions(1)
    return getAllStudents(testDb).then((students) => {
      expect(students).toHaveLength(4)
    })
  })
})

describe('addSessions', () => {
  test('adds a new session to the database', () => {
    expect.assertions(7)

    const mockInfo = [
      {
        start: '22-10-02',
        end: '06:04',
        student_id: 7,
        studentNotes: 'Hello',
        teacher_id: 2,
        teacherNotes: 'Goodbye',
      },
      {
        start: '21-10-06',
        end: '05:24',
        student_id: 4,
        studentNotes: 'Hey',
        teacher_id: 7,
        teacherNotes: 'Bye',
      },
    ]

    return addSessions(mockInfo, testDb)
      .then(() => {
        return testDb('sessions').select()
      })
      .then((sessions) => {
        expect(sessions).toHaveLength(7)
        expect(sessions[5].student_id).toBe(7)
        expect(sessions[5].teacher_id).toBe(2)
        expect(sessions[5].studentNotes).toBe('Hello')
        expect(sessions[5].teacherNotes).toBe('Goodbye')
        expect(sessions[5].start).toBe('22-10-02')
        expect(sessions[5].end).toBe('06:04')
      })
  })
})
