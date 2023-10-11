const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const { addEvents, getAllEvents } = require('./db.js')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getAllEvents', () => {
  test('gets students from the database', () => {
    expect.assertions(1)
    return getAllEvents(testDb).then((students) => {
      expect(students).toHaveLength(2)
    })
  })
})

describe('addEvents', () => {
  test('addsnew Events to db', () => {
    const mockInfo = [
      {
        start: new Date(),
        end: new Date(),
        title: 'Kates Event',
        type: 'Reading',
        link: 'www.stuff.co.nz',
        location: 'a bookstore',
        imageURL: '',
        about: 'some words that will be in the about section',
        facebook: 'www.facebook.com',
        instagram: 'www.instagram.com',
        twitter: 'www.twitter.com',
        typeother: '',
        inperson: 'In Person',
        cost: '10',
        alternativeContact: 'Person2',
        contact: 'Person1',
        organisation: 'Place1',
        extranotes: 'notes in extra notes mod',

        koha: false,
        buyTixLink: 'www.stuff.co.nz',
        unwagedCost: '5',
      },
      {
        start: new Date(),
        end: new Date(),
        title: 'Kates Event',
        type: 'Reading',
        link: 'www.stuff.co.nz',
        location: 'a bookstore',
        imageURL: '',
        about: 'some words that will be in the about section',
        facebook: 'www.facebook.com',
        instagram: 'www.instagram.com',
        twitter: 'www.twitter.com',
        typeother: '',
        inperson: 'In Person',
        cost: '10',
        alternativeContact: 'Person2',
        contact: 'Person1',
        organisation: 'Place1',
        extranotes: 'notes in extra notes mod',

        koha: false,
        buyTixLink: 'www.stuff.co.nz',
        unwagedCost: '5',
      },
    ]

    return addEvents(mockInfo, testDb)
      .then(() => {
        return testDb('events').select()
      })
      .then((events) => {
        expect(events).toHaveLength(4)
      })
  })
})
