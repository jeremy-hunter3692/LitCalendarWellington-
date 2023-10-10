import React from 'react'
import AddEvent from './AddEvents'
import { unpackDetails } from '../javascript/functions.js'

export default function EditEvent({ details }) {
  const fixedDetails = unpackDetails(details)

  return <AddEvent editDetails={fixedDetails} />
}
