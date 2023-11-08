import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'

import moment from 'moment'
import PopupEvent from './PopupEvent'
import DeleteTheseEventsPop from './DeleteTheseEventsPop'
import { deleteEventsArray } from '../eventsAPI'

import '!style-loader!css-loader!../../server/public/sass/styles.css'

// import '/public/sass/styles.css'

const localizer = momentLocalizer(moment)

export default function MyCalendar({
  eventsProps,
  showEditSetter,
  editing,
  globalEventsDelete,
  multiDelete,
  multiDeleteSetter,
}) {
  const [displayPop, setDisplayPop] = useState()
  const [popDetails, setPopDetails] = useState({})
  const [mousePos, setMousePos] = useState({})
  const [eventsToBeDeletedArr, setEventsToBeDeletedArr] = useState([])

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
        top: event.clientY > 470 ? event.clientY - 450 : event.clientY - 99,
      })
    }
    // console.log('left', mousePos?.left, 'top', mousePos.top)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [displayPop])

  function handleSelect(e) {
    // console.log(e)
    setDisplayPop(false)
    if (multiDelete) {
      console.log('setting', e)
      setEventsToBeDeletedArr([...eventsToBeDeletedArr, e])
    } else if (editing) {
      showEditSetter(e)
      setDisplayPop(false)
    } else {
      setPopDetails(e)
      setTimeout(() => setDisplayPop(true), 1)
    }
  }

  function close() {
    setDisplayPop(false)
  }

  function handleDelete() {
    deleteEventsArray(eventsToBeDeletedArr)
    globalEventsDelete(eventsToBeDeletedArr)
    setEventsToBeDeletedArr([])
    multiDeleteSetter()
  }

  function handleNo() {
    multiDeleteSetter()
    setEventsToBeDeletedArr([])
  }
  return (
    <>
      <DeleteTheseEventsPop eventsToBeDeletedArr={eventsToBeDeletedArr} />

      {multiDelete && (
        <>
          {' '}
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleNo}>Cancel</button>
        </>
      )}
      <h1>Calender</h1>
      <div className="calendar">
        {displayPop && (
          <PopupEvent details={popDetails} styleData={mousePos} close={close} />
        )}

        <Calendar
          localizer={localizer}
          events={eventsProps}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: '90%' }}
          defaultView={Views.MONTH}
          // selectable={true}
          onSelectEvent={handleSelect}
          // eventPropGetter={(event, start, end, isSelected) => {className: string, style?: Object}}
          longPressThreshold={10}
        />
      </div>
    </>
  )
}
