import '@testing-library/jest-dom'

import unpackDetails from './unpackDetails.js'

describe('edit event', () => {
  test('unpacks date object correctly', () => {
    const dateObj = new Date('January 18, 1988 06:05:00')
    const endDateOb = new Date('January 18, 1988 18:05:00')

    const details = {
      start: dateObj,
      end: endDateOb,
    }
    const returnDeets = {
      year: 1988,
      month: 'January',
      date: '18',
      hour: 6,
      minutes: 5,
      endHours: 18,
      endMinutes: 5,
      start: dateObj,
      end: endDateOb,
    }
    const testDeets = unpackDetails(details)
    expect(testDeets).toEqual(returnDeets)
  })
})
