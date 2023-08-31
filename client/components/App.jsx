import React, { useState } from 'react'
import Nav from './Nav'
import AddEvent from './AddEvents'
import CalendarContainer from './CalendarContainer'

const App = () => {
  const [globalEvents, setGlobalEvents] = useState([])
  const [showAddEvents, setShowAddEvents] = useState(false)
  console.log(globalEvents)
  function globalEventSetter(input) {
    setGlobalEvents(input)
    // console.log('applevelstate:', input, globalEvents)
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
      {showAddEvents ? (
        <AddEvent
          eventsSetter={globalEventSetter}
          showAddEventSetter={showAddEventSetter}
        />
      ) : (
        <CalendarContainer eventsProps={globalEvents} />
      )}
    </>
  )
}

export default App
