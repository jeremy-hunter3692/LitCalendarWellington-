import React, { useState } from 'react'
import Nav from './Nav'
import AddEvent from './AddEvents'
import CalendarContainer from './CalendarContainer'

const App = () => {
  const [globalEvents, setGlobalEvents] = useState([])
  function globalEventSetter(input) {
    setGlobalEvents(input)
    // console.log('applevelstate:', input, globalEvents)
  }
  return (
    <>
      <Nav />
      <AddEvent eventsSetter={globalEventSetter} />
      <CalendarContainer eventsProps={globalEvents} />
    </>
  )
}

export default App
