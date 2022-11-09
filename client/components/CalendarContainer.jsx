import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { addEvents } from '../Actions/eventsActions'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// import '/public/sass/styles.css'

const localizer = momentLocalizer(moment)

export default function MyCalendar() {
  const dispatch = useDispatch()
  const eventData = useSelector((state) => state.events)
  const [events, setEvents] = useState([
    {
      title: 'author talk',
      start: new Date(),
      end: new Date(),
      tyope: 'author talk',

      location: 'unity books',
      imageURL: 'www.whatever',
      sociallinks: {
        facebook: 'www.f',
        instagram: 'www.i',
        twitter: 'www.t',
      },
    },
  ])
  // const [newEvents, setNewEvents] = useState([])

  useEffect(() => {
    // console.log(eventData)
    eventData[0] ? setEvents(eventData) : setEvents([])
  }, [eventData])

  function handleSelect({ start, end }) {
    console.log('onselecetedslot')
    //Add newEvent to redux state
    console.log('handle select', start, end)(start, end)
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
