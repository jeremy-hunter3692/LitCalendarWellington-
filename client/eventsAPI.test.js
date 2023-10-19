import nock from 'nock'

const {
  deleteEvent,
  getAllEvents,
  addEvents,
  upDateEvent,
  deleteEventsArray,
} = require('./eventsAPI')

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
      expect(typeof result[0].start).toBe('object')
      expect(typeof result[1].start).toBe('object')
      expect(scope.isDone()).toBe(true)
    })
  })

  // test('gets specific event from db', () => {
  //   const scope = nock('http://localhost')
  //     .get(apiUrl + '/1')
  //     .reply(200, { data: 'testing data' })
  //   return getEventById(1).then((result) => {
  //     expect(result).toEqual({ data: 'testing data' })
  //     expect(scope.isDone()).toBe(true)
  //   })
  // })

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

describe('updates ans event with given id', () => {
  test('updates with correct id', () => {
    const changes = { title: 'titleChanged', id: 1 }
    const { id } = changes
    const scope = nock('http://localhost')
      .put(apiUrl + '/' + id)
      .reply(200, changes)
    return upDateEvent(changes).then((res) => {
      // expect(res.id).toBe(id)
      // expect(1).toBe(1)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deletes an event', () => {
  test('deletes the event', () => {
    const id = 45
    const scope = nock('http://localhost')
      .delete(`${apiUrl}/${id}`)
      .reply(200, { id: id, message: 'was deleted' })
    return deleteEvent(id).then((res) => {
      expect(res.status).toBe(200)
      expect(res.body.message).toBe('was deleted')
      expect(res.body.id).toBe(45)
      expect(1).toBe(1)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deletes several events', () => {
  test('delets events array', () => {
    const eventsArr = [
      { id: 45, data: 'stuff' },
      { id: 46, data: 'stuff' },
      { id: 2, data: 'stuff' },
    ]
    const scope = nock('http://localhost').post(eventsArr).reply(200)
    return deleteEventsArray(eventsArr).then((res) => {
      expect(res).toBe([45, 46, 2])
      expect(scope.isDone()).toBe(true)
    })
  })
})
