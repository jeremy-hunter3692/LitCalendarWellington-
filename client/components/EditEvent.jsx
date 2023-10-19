import React from 'react'
import AddEvent from './AddEvents'
import { unpackDetails } from '../javascript/functions.js'
import { upDateEvent, deleteEvent } from '../eventsAPI'

export default function EditEvent({
  details,
  showEditSetter,
  globalEventsAddandUpdate,
  globalEventsDelete,
}) {
  function onSubmit(inpt) {
    //add to global state for instant update//with out re calling db
    globalEventsAddandUpdate(inpt)
    //below is actul api call
    upDateEvent(inpt)
    //return to calendar page
    showEditSetter()
  }
  function apiDeleteEvent() {
    //delete at api level
    deleteEvent(details.id)
    //remove from state
    globalEventsDelete(details)
    //return to calendar page
    showEditSetter()
  }
  const fixedDetails = unpackDetails(details)
  return (
    <>
      <button onClick={apiDeleteEvent}>Delete Event</button>
      <AddEvent editDetails={fixedDetails} updateEvent={onSubmit} />
    </>
  )
}
