import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import AddEvent from './AddEvents'
import CalendarContainer from './CalendarContainer'
import EditEvent from './EditEvent'
import { getAllEvents } from '../eventsAPI'

const App = () => {
  const [globalEvents, setGlobalEvents] = useState([])
  const [showAddEvents, setShowAddEvents] = useState(false)
  const [edit, showEdit] = useState(false)

  useEffect(() => {
    getAllEvents()
      .then((res) => {
        console.log('inuse', res)
        setGlobalEvents(res)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }, [])

  function globalEventSetter(input) {
    setGlobalEvents(input)
    console.log('applevelstate:', input, globalEvents)
  }

  function showAddEventSetter() {
    setShowAddEvents(!showAddEvents)
  }

  return (
    <>
      <Nav />
      <button onClick={showAddEventSetter}>
        {showAddEvents ? 'Back' : 'Submit new event'}
      </button>

      {!edit && <button onClick={() => showEdit(true)}>edit</button>}

      {edit ? <EditEvent details={globalEvents[0]} /> : ''}
      {showAddEvents ? (
        <AddEvent
          eventsSetter={globalEventSetter}
          showAddEventSetter={showAddEventSetter}
        />
      ) : (
        !edit && <CalendarContainer eventsProps={globalEvents} />
      )}
    </>
  )
}

export default App
