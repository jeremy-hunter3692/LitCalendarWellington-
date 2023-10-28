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
  const [multiDelete, setMultiDelete] = useState(false)
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

  function filterEventsArr(inputArr) {
    return globalEvents.filter((x) => !inputArr.includes(x))
  }

  function globalEventSetter(event) {
    if (editingSelection) {
      //have to do this by id because everythign else is getting updated
      const update = globalEvents.filter((x) => x.id != event.id)
      setGlobalEvents([...update, event])
    } else {
      setGlobalEvents([...globalEvents, event])
    }
  }

  function globalSateDelete(inputArr) {
    setGlobalEvents(filterEventsArr(inputArr))
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

  function showAddEventSetter() {
    setShowAddEvents(!showAddEvents)
  }

  function multiDeleteSetter(){
    setMultiDelete(!multiDelete)
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
      {multiDelete && <h2>Multi Deleting</h2>}
      <button onClick={() => setMultiDelete(!multiDelete)}>
        {multiDelete ? 'cancel multi delete' : 'MultiDelete'}
      </button>

      {showEditEventPage ? (
        <EditEvent
          details={editDetails}
          showEditSetter={showEditEvent}
          globalEventsDelete={globalSateDelete}
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
            globalEventsDelete={globalSateDelete}
            multiDelete={multiDelete}
            multiDeleteSetter={multiDeleteSetter}
          />
        )
      )}
    </>
  )
}

export default App
