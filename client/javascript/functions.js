import { months, daysEachMonth, toBeDeleted } from './initCalendarData'

//TODOO implement below
// function recurringEvent(firstEvent, length) {
//   // make variable for weekly or monthly
//   // if weekly 7 else monthtly get getMonth = 1 ??
//   const daysAdded = length
//   console.log('req top', firstEvent)
//   const weeklyEvents = [firstEvent]
//   for (let i = 1; i < length; i++) {
//     let newDate = {
//       ...firstEvent,
//       //copying last loops datetime
//       start: new Date(weeklyEvents[i - 1].start.valueOf()),
//       end: new Date(weeklyEvents[i - 1].end.valueOf()),
//     }
//     //adding the 7 days to the last weeks datetime
//     newDate.start.setDate(newDate.start.getDate() + daysAdded)
//     newDate.end.setDate(newDate.end.getDate() + daysAdded)
//     //push to returning array
//     weeklyEvents.push(newDate)
//   }
//   console.log('recurring', weeklyEvents)
//   // return weeklyEvents
// }
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

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

function copyWithNewDateObj(data) {
  //array in
  return data.map((x) => {
    return {
      ...x,
      start: new Date(x.start),
      end: new Date(x.end),
      modNotes: { ...x.modNotes },
    }
  })
}

function deleteExtras(input) {
  let arrayed = Object.keys(input)
  arrayed.map((x) => {
    if (toBeDeleted.includes(x)) {
      delete input[x]
    }
  })
}

function timeCheck(form) {
  return form.start?.getHours() > form.end?.getHours()
    ? 'End time is before start time'
    : form.start?.getHours() === form.end?.getHours()
    ? form.start?.getMinutes() > form.end?.getMinutes()
      ? 'End time is before start time'
      : ''
    : ''
}

function sanitizeSubmitObject(obj) {
  //TO DO check date object copying here rather than taking the date object.
  const copiedObj = copyWithNewDateObj([obj])
  const deArrayed = copiedObj[0]
  deArrayed.koha ? (deArrayed.buyTixLink = null) : ''
  deleteExtras(deArrayed)
  return deArrayed
}

export {
  deleteExtras,
  makeDateObject,
  getDaysOfSelectedMonth,
  getMonthIdx,
  unpackDetails,
  copyWithNewDateObj,
  timeCheck,
  sanitizeSubmitObject,
}
