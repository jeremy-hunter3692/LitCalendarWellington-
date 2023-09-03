import React from 'react'
import AddEvent from './AddEvents'

const fixedDetails = {}

export default function EditEvent({ details }) {
  console.log('deets', details)

  return <AddEvent details={fixedDetails} />
}
