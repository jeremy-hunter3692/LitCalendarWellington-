import React from 'react'
import AddEvent from './AddEvents'
import unpackDetails from '../components/functions/unpackDetails.js'

export default function EditEvent({ details }) {
  const fixedDetails = unpackDetails(details)

  return <AddEvent editDetails={fixedDetails} />
}
