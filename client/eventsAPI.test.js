import nock from 'nock'

const { getEventById, getAllEvents, addEvents } = require('./eventsAPI')

const apiUrl = '/api/v1/events'

describe('getAllEvents', () => {
  test('gets All events from db and remakes the date object', () => {
    const date = new Date('2023-10-10T20:33:33.967Z')
    const scope = nock('http://localhost')
      .get(apiUrl)
      .reply(200, [
        {
          start: '2023-10-10T20:33:33.967Z',
          end: '2023-10-10T20:33:33.967Z',
          alternativeContact: '2',
          contact: '1',
          organisation: '3',
          extranotes: '1234',
        },
      ])
    return getAllEvents().then((result) => {
      expect(result).toEqual([
        {
          start: date,
          end: date,
          modNotes: {
            alternativeContact: '2',
            contact: '1',
            organisation: '3',
            extranotes: '1234',
          },
        },
      ])
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

  test('adds events to the database with times in utc and does not mutate', () => {
    const data = [
      {
        start: new Date('1995-12-17T03:24:00'),
        end: new Date('1995-12-20T03:24:00'),
      },
      {
        start: new Date('1998-12-17T03:24:00'),
        end: new Date('1998-12-18T03:24:00'),
      },
    ]
    const scope = nock('http://localhost').post(apiUrl).reply(200, data)

    return addEvents(data).then((result) => {
      const returnData = result[1]
      expect(returnData[0].start).toEqual(data[0].start.toUTCString())
      expect(returnData[0].end).toEqual(data[0].end.toUTCString())
      expect(returnData[1].start).toEqual(data[1].start.toUTCString())
      expect(returnData[1].end).toEqual(data[1].end.toUTCString())
      expect(returnData[0].start).not.toBe(data[0].start)
      expect(returnData[0].end).not.toBe(data[0].end)
      expect(returnData[1].start).not.toBe(data[1].start)
      expect(returnData[1].end).not.toBe(data[1].end)
      expect(returnData).not.toBe(data)

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
