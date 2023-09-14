import React from 'react'
import AddEvent from './AddEvents'

export default function EditEvent({ details }) {
  function unpackDeatils(details) {
    const { start, end } = details
    const returnDetails = { ...details }
    returnDetails.year = start.getFullYear()
    returnDetails.month = start.toLocaleString('default', {
      month: 'long',
    })
    returnDetails.date = start.getDate().toString()
    returnDetails.hour = start.getHours()
    returnDetails.minutes = start.getMinutes()
    returnDetails.endHours = end.getHours()
    returnDetails.endMinutes = end.getMinutes()

    return returnDetails
  }

  const fixedDetails = unpackDeatils(details)

  return <AddEvent editDetails={fixedDetails} />
}
