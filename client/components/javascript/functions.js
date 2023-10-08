import { months, daysEachMonth, toBeDeleted } from './initCalendarData'

function unpackDetails(details) {
  const { start, end } = details
  const returnDetails = { ...details }
  returnDetails.year = start.getFullYear()
  returnDetails.month = start.toLocaleString('default', {
    month: 'long',
  })

  returnDetails.date = start.getDate().toString()
  returnDetails.hour = start.getHours()
  returnDetails.minutes = start.getMinutes()
  returnDetails.endHours = end.getHours()
  returnDetails.endMinutes = end.getMinutes()

  return returnDetails
}

function getMonthIdx(month) {
  return months.findIndex((x) => x === month)
}

function getDaysOfSelectedMonth(month) {
  let numbers = []
  if (month) {
    const idx = getMonthIdx(month)
    numbers = Array(daysEachMonth[idx])
      .fill(0)
      .map((_, idx) => idx + 1)
  }
  return numbers
}

function makeDateObject({ year, month, date, hour, minutes }) {
  const deStringedMonth = getMonthIdx(month)
  return new Date(year, deStringedMonth, date, hour, minutes)
}

function deleteExtras(input) {
  let arrayed = Object.keys(input)
  arrayed.map((x) => {
    if (toBeDeleted.includes(x)) {
      delete input[0][x]
    }
  })
}
export {
  deleteExtras,
  makeDateObject,
  getDaysOfSelectedMonth,
  getMonthIdx,
  unpackDetails,
}
