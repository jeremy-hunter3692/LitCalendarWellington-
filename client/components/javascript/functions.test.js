import '@testing-library/jest-dom'

import {
  unpackDetails,
  deleteExtras,
  makeDateObject,
  getDaysOfSelectedMonth,
  getMonthIdx,
} from './functions.js'

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

  test('Makes the date object corrently', () => {
    const testVarObj = {
      year: 2023,
      month: 'January',
      date: 18,
      hour: 18,
      minutes: 5,
    }
    const returnDateObj = makeDateObject(testVarObj)
    const year = returnDateObj.getFullYear()
    const month = returnDateObj.getMonth()
    const date = returnDateObj.getDate()
    const hour = returnDateObj.getHours()
    const minutes = returnDateObj.getMinutes()
    expect(typeof returnDateObj).toBe('object')
    expect(year).toBe(testVarObj.year)
    expect(month).toBe(0)
    expect(date).toBe(18)
    expect(hour).toBe(18)
    expect(minutes).toBe(5)
  })
})
