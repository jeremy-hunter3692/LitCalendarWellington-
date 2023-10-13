import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import AddEvent from './AddEvents'
import CalendarContainer from './CalendarContainer'
import EditEvent from './EditEvent'
import { getAllEvents } from '../eventsAPI'

const App = () => {
  const [globalEvents, setGlobalEvents] = useState([])
  const [showAddEvents, setShowAddEvents] = useState(false)
  const [showEditEventPage, setShowEditEventPage] = useState(false)
  const [editingSelection, setEditingSelection] = useState(false)
  const [editDetails, setEditDetails] = useState()
  console.log({ showEditEventPage }, { editingSelection }, { editDetails })

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
    if (editingSelection) {
      const update = globalEvents.filter((x) => x.id != input.id)
      console.log('updating filtered array', update)
      setGlobalEvents([...update, input])
    } else {
      setGlobalEvents([...globalEvents, input])
    }
    console.log('applevelstate:', input, globalEvents)
  }

  function showAddEventSetter() {
    setShowAddEvents(!showAddEvents)
  }

  function showEditEvent(e) {
    showEditEventPage ? setEditingSelection(!editingSelection) : ''
    setShowEditEventPage(!showEditEventPage)
    setEditDetails(e)
    console.log('showEidd', showEditEventPage, editingSelection)
  }

  return (
    <>
      <Nav />

      {!editingSelection && (
        <button onClick={showAddEventSetter}>
          {showAddEvents ? 'Back' : 'Submit new event'}
        </button>
      )}
      {!showAddEvents && (
        <button onClick={() => setEditingSelection(!editingSelection)}>
          {' '}
          {editingSelection ? 'Back' : 'Edit'}
        </button>
      )}

      {editingSelection && (
        <h1 style={{ 'background-color': 'red' }}>EDITING EVENTS</h1>
      )}
      {showEditEventPage ? (
        <EditEvent
          details={editDetails}
          showEditSetter={showEditEvent}
          addToGlobalEvents={globalEventSetter}
        />
      ) : (
        ''
      )}
      {showAddEvents ? (
        <div>
          <AddEvent
            eventsSetter={globalEventSetter}
            showAddEventSetter={showAddEventSetter}
          />
        </div>
      ) : (
        !showEditEventPage && (
          <CalendarContainer
            eventsProps={globalEvents}
            showEditSetter={showEditEvent}
            editing={editingSelection}
          />
        )
      )}
    </>
  )
}

export default App
