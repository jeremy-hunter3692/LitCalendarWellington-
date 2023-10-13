import React from 'react'
import AddEvent from './AddEvents'
import { unpackDetails } from '../javascript/functions.js'
import { upDateEvent } from '../eventsAPI'

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
  const fixedDetails = unpackDetails(details)
  return (
    <>
      <AddEvent editDetails={fixedDetails} updateEvent={onSubmit} />
    </>
  )
}
