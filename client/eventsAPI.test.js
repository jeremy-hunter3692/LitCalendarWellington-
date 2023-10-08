import nock from 'nock'

const { getEventById, getAllEvents, addEvents } = require('./eventsAPI')

const apiUrl = '/api/v1/events'

describe('getAllEvents', () => {
  test('gets All events from db', () => {
    const scope = nock('http://localhost')
      .get(apiUrl)
      .reply(200, { data: 'testing data' })
    return getAllEvents().then((result) => {
      expect(result).toEqual({ data: 'testing data' })
      expect(scope.isDone()).toBe(true)
    })
  })

  test('gets specific event from db', () => {
    const scope = nock('http://localhost')
      .get(apiUrl + '/1')
      .reply(200, { data: 'testing data' })
    return getEventById(1).then((result) => {
      expect(result).toEqual({ data: 'testing data' })
      expect(scope.isDone()).toBe(true)
    })
  })

  //TO DOOOOO
  //check what type of object you are actually sending here and what format it will be in
  test('adds events to the database with times in utc', () => {
    const scope = nock('http://localhost')
      .post(apiUrl)
      .reply(200, { data: 'testing data' })
    const data = [
      { start: new Date(), end: new Date() },
      { start: new Date('1995-12-17T03:24:00'), end: new Date() },
    ]

    const dataRes = data[0].start.toUTCString()
    const dataRes1 = data[1].start.toUTCString()
    const dataResEnd = data[0].end.toUTCString()
    const dataRes1End = data[1].end.toUTCString()

    // data.map((x) => {
    //   x.start = 1 //x.start.toUTCString()
    // })

    return addEvents(data).then((result) => {
      expect(result[0]).toEqual({ data: 'testing data' })
      expect(result[1][0].start).toEqual(dataRes)
      expect(result[1][0].end).toEqual(dataResEnd)
      expect(result[1][1].start).toEqual(dataRes1)
      expect(result[1][1].end).toEqual(dataRes1End)
      expect(scope.isDone()).toBe(true)
    })
  })
  //figure out how to check errors from apiclient
  test('returns an error from addEvents', () => {
    const scope = nock('http://localhost')
      .post(apiUrl)
      .reply(400, { data: 'testing data' })
    const data = [
      { start: new Date(), end: new Date() },
      { start: new Date('1995-12-17T03:24:00'), end: new Date() },
    ]
    return addEvents(data).then((result) => {
      expect(result).toBe('post not saved')
      expect(scope.isDone()).toBe(true)
    })
  })
})
