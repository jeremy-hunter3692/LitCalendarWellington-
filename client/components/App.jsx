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
  // console.log({ showEditEventPage }, { editingSelection }, { editDetails })

  useEffect(() => {
    getAllEvents()
      .then((res) => {
        setGlobalEvents(res)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }, [])

  function globalEventSetter(input) {
    if (editingSelection) {
      const update = globalEvents.filter((x) => x.id != input.id)
      setGlobalEvents([...update, input])
    } else {
      setGlobalEvents([...globalEvents, input])
    }
  }

  function globalDelete(input) {
    const filtered = globalEvents.filter((x) => x.id != input.id)
    setGlobalEvents(filtered)
  }
  function showAddEventSetter() {
    setShowAddEvents(!showAddEvents)
  }

  function showEditEvent(e) {
    showEditEventPage ? setEditingSelection(!editingSelection) : ''
    setShowEditEventPage(!showEditEventPage)
    setEditDetails(e)
  }

  function backButtonForEditing() {
    setEditingSelection(!editingSelection)
    showEditEvent ? setShowEditEventPage(false) : ''
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
        <button onClick={backButtonForEditing}>
          {' '}
          {editingSelection ? 'Back' : 'Edit Events'}
        </button>
      )}

      {editingSelection && (
        <h1 style={{ backgroundColor: 'red' }}>EDITING EVENTS</h1>
      )}

      {showEditEventPage ? (
        <EditEvent
          details={editDetails}
          showEditSetter={showEditEvent}
          globalEventsDelete={globalDelete}
          globalEventsAddandUpdate={globalEventSetter}
        />
      ) : showAddEvents ? (
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
