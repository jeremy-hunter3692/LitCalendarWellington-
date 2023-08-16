import React, { useState } from 'react'
import Nav from './Nav'
import AddEvent from './AddEvents'
import CalendarContainer from './CalendarContainer'

const App = () => {
  const [globalEvents, setGlobalEvents] = useState([])
  const [showAddEvents, setShowAddEvents] = useState(false)

  function globalEventSetter(input) {
    setGlobalEvents(input)
    // console.log('applevelstate:', input, globalEvents)
  }

  function addEvent() {
    setShowAddEvents(!showAddEvents)
  }
  return (
    <>
      <Nav />
      <button onClick={addEvent}>Submit new event</button>
      {showAddEvents ? (
        <AddEvent eventsSetter={globalEventSetter} />
      ) : (
        <CalendarContainer eventsProps={globalEvents} />
      )}
    </>
  )
}

export default App
