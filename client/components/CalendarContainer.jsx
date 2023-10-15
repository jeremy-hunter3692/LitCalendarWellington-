import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'

import moment from 'moment'
import PopupEvent from './PopupEvent'

import '!style-loader!css-loader!../../server/public/sass/styles.css'
// import '/public/sass/styles.css'

const localizer = momentLocalizer(moment)

export default function MyCalendar({ eventsProps, showEditSetter, editing }) {
  const [displayPop, setDisplayPop] = useState()
  const [popDetails, setPopDetails] = useState({})
  const [mousePos, setMousePos] = useState({})

  // console.log('calendar init', eventsProps)
  // const [events, setEvents] = useState(eventsProps)

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({
        margin: 0,
        padding: 0,
        width: '20rem',
        height: '35rem',
        position: 'absolute',
        left: event.clientX > 650 ? event.clientX - 300 : event.clientX,
        top: event.clientY > 470 ? event.clientY - 500 : event.clientY - 299,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [displayPop])

  function handleSelect(e) {
    setDisplayPop(false)
    if (editing) {
      showEditSetter(e)
      setDisplayPop(false)
    }
    setPopDetails(e)
    setTimeout(() => setDisplayPop(true), 1)
  }

  function close() {
    setDisplayPop(false)
  }

  return (
    <div className="calendar">
      {displayPop && (
        <PopupEvent details={popDetails} styleData={mousePos} close={close} />
      )}
      <h1>Calender</h1>
      <Calendar
        localizer={localizer}
        events={eventsProps}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        defaultView={Views.MONTH}
        // selectable={true}
        onSelectEvent={handleSelect}
        // eventPropGetter={(event, start, end, isSelected) => {className: string, style?: Object}}
        longPressThreshold={10}
      />
    </div>
  )
}
