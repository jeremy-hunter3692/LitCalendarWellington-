import nock from 'nock'

const { getAllStudents } = require('./studentsAPI')

const apiUrl = '/api/v1/students'

describe('getAllStudents', () => {
  test('gets all students from the db', () => {
    const scope = nock('http://localhost')
      .get(apiUrl)
      .reply(200, { data: 'testing data' })
    return getAllStudents().then((result) => {
      expect(result).toEqual({ data: 'testing data' })
      expect(scope.isDone()).toBe(true)
    })
  })
})
