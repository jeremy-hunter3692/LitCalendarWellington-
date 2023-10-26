import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'

import moment from 'moment'
import PopupEvent from './PopupEvent'
import { deleteEventsArray } from '../eventsAPI'

import '!style-loader!css-loader!../../server/public/sass/styles.css'
// import '/public/sass/styles.css'

const localizer = momentLocalizer(moment)
const eventsToBeDeletedArr = []
export default function MyCalendar({ eventsProps, showEditSetter, editing, globalEventsDelete }) {
  const [displayPop, setDisplayPop] = useState()
  const [popDetails, setPopDetails] = useState({})
  const [mousePos, setMousePos] = useState({})
  const [multiDelete, setMultiDelete] = useState(false)

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
      getIds(e)
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

  function getIds(e) {
    eventsToBeDeletedArr.push(e)
    console.log(eventsToBeDeletedArr)
  }

  function handleDelete() {
    deleteEventsArray(eventsToBeDeletedArr)
    globalEventsDelete(eventsToBeDeletedArr)

  }

  return (
    <>
      <h1>Calender</h1>
      <div className="calendar">
        {multiDelete && <h2>Multi Deleting</h2>}
        <button onClick={() => setMultiDelete(!multiDelete)}>
          MultiDelete
        </button>
        <button onClick={handleDelete}>detele confrim</button>
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
