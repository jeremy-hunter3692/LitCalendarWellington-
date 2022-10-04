import nock from 'nock'

const { getLastSession, addSession } = require('./apiClient')

const apiUrl = '/api/v1/sessions'

describe('getLastSession', () => {
  test('gets last session from the database', () => {
    const scope = nock('http://localhost')
      .get(apiUrl)
      .reply(200, { data: 'testing data' })
    return getLastSession().then((result) => {
      expect(result).toEqual({ data: 'testing data' })
      expect(scope.isDone()).toBe(true)
    })
  })

  test('adds a session to the database', () => {
    const scope = nock('http://localhost')
      .post(apiUrl)
      .reply(200, { data: 'testing data' })
    const data = { data: 'test' }
    return addSession(data).then((result) => {
      expect(result).toEqual({ data: 'testing data' })
      expect(scope.isDone()).toBe(true)
    })
  })
  //figure out how to check errors from apiclient
  test('returns an error from add Session', () => {
    const scope = nock('http://localhost')
      .post(apiUrl)
      .reply(400, { data: 'testing data' })
    const data = { data: 'test' }
    return addSession(data).then((result) => {
      console.log('resul', result)
      expect(result).toBe('post not saved')
      expect(scope.isDone()).toBe(true)
    })
  })
})
