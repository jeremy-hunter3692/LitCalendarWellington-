import React, { useState } from 'react'
import Nav from './Nav'
import AddEvent from './AddEvents'
import CalendarContainer from './CalendarContainer'
import EditEvent from './EditEvent'

const App = () => {
  const [globalEvents, setGlobalEvents] = useState([])
  const [showAddEvents, setShowAddEvents] = useState(false)
  const [edit, showEdit] = useState(false)

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
