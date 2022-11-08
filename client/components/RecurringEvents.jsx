import React from 'react'

export default function RecurringEvents() {
  const event = {
    start: new Date(2022, 9, 6, 17, 0, 0),
    end: new Date(2022, 9, 6, 18, 0, 0),
    title: 'First event', //student.name
    studentId: 3,
  }

  const date = event.start

  //date.setMonth(date.getMonth() + 3

  function createWeeklyEvent(date, length) {
    const weeklyEvents = [date]
    for (let i = 0; i < length; i++) {
      let newDate = new Date(weeklyEvents[i].valueOf())
      newDate.setDate(newDate.getDate() + 7)
      weeklyEvents.push(newDate)
    }
  }

  return (
    <h1>
      {date.start}
      {date.start}
      <button onClick={createWeeklyEvent(date, 3)}>Click</button>
    </h1>
  )
}
