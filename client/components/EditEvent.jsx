import React from 'react'
import AddEvent from './AddEvents'
import { unpackDetails } from '../javascript/functions.js'
import { upDateEvent, deleteEvent } from '../eventsAPI'

export default function EditEvent({
  details,
  showEditSetter,
  addToGlobalEvents,
}) {
  function onSubmit(inpt) {
    //add to global state for instant update//with out re calling db
    addToGlobalEvents(inpt)
    //below is actul api call
    upDateEvent(inpt)
    //return to calendar page
    showEditSetter()
  }
  function ApiDeleteEvent() {
    console.log('edit:', details.id, details)
    deleteEvent(details.id)
  }
  const fixedDetails = unpackDetails(details)
  return (
    <>
      <button onClick={ApiDeleteEvent}>Delete Event</button>
      <AddEvent editDetails={fixedDetails} updateEvent={onSubmit} />
    </>
  )
}
