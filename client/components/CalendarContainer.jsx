import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { addEvents } from '../Actions/eventsActions'

// import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)
// const initEvent = [
//   {
//     start: ' ',
//     end: ' ',
//     title: 'init ',
//   },
// ]

export default function MyCalendar({ student, recurringNumber }) {
  const dispatch = useDispatch()
  const eventData = useSelector((state) => state.events)
  // console.log('1', student)
  const [events, setEvents] = useState([])
  const [newEvents, setNewEvents] = useState([])

  useEffect(() => {
    // console.log(eventData)
    eventData[0] ? setEvents(eventData) : setEvents([])
  }, [eventData])

  function createWeeklyEvent(newEvent, length) {
    const weeklyEvents = [newEvent]
    for (let i = 0; i < length; i++) {
      let newDate = {
        ...newEvent,
        start: new Date(weeklyEvents[i].start.valueOf()),
        end: new Date(weeklyEvents[i].end.valueOf()),
      }
      newDate.start.setDate(newDate.start.getDate() + 7)
      newDate.end.setDate(newDate.end.getDate() + 7)
      // newDate.setDate(newDate.getDate() + 7)
      weeklyEvents.push(newDate)
    }
    return weeklyEvents
  }

  function handleSelect({ start, end }) {
    console.log('onselecetedslot')

    //Add newEvent to redux state
    console.log('handle select', start, end)
    addEvent(start, end)
  }

  function addEvent(start, end) {
    console.log('add Event', start, end)
    let length = recurringNumber - 1
    let title = student.name
    //TODO get teacher id on load?
    let teacher = 4
    // imrpove this logic/defnsive stuff
    if (title != ' ') {
      let newEvent = {
        start: start,
        end: end,
        title: title,
        studentNotes: '',
        teacherNotes: '',
        studentId: student.id,
        teacherId: teacher,
      }
      setNewEvents([...newEvents, newEvent])
      let resultArr = createWeeklyEvent(newEvent, length || 0)
      console.group('resultarr', resultArr)
      // dispatch(addEvents(resultArr))
      setEvents([...events, newEvent])
    }
  }

  //save on navigate away??
  function submit() {
    dispatch(addEvents(newEvents))
  }

  return (
    <div>
      <button onClick={submit}>submit events</button>
      <h1>Calender</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView={Views.DAY}
        selectable={true}
        onSelectSlot={handleSelect}
        longPressThreshold={10}
      />
    </div>
  )
}
