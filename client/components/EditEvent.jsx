import React from 'react'
import AddEvent from './AddEvents'

// const initDetails = {
//   month: 'January',
//   date: '1',
//   hour: '0',
//   year: yearNow,
//   start: new Date(yearNow, '01', '00', '00'),
//   end: new Date(yearNow, '01', '01', '00'),
//   minutes: '0',
//   endHours: '0',
//   endMinutes: '0',
//   title: '',
//   type: 'Book Launch',
//   link: '',
//   location: '',
//   imageURL: '',
//   about: '',
//   facebook: '',
//   instagram: '',
//   twitter: '',
//   typeother: '',
//   inperson: 'In Person',
//   cost: '',
//   modNotes: {},
//   koha: false,
//   buyTixLink: null,
// }

export default function EditEvent({ details }) {
  console.log('deets', details)

  // function unpackDeatils(details) {
  //   const { start, end } = details
  //   const returnDetails = { ...details }
  //   returnDetails.year = start.getYear()
  //   returnDetails.date = start.getDate()
  //   returnDetails.hour = start.getHours()
  //   returnDetails.minutes = start.getMinutes()
  //   returnDetails.endHours = end.getHours()
  //   returnDetails.endMinutes = end.getMinutes()

  //   return returnDetails
  // }

  const fixedDetails = { ...details }
  // unpackDeatils(details)
  console.log('return', fixedDetails)
  return <AddEvent details={fixedDetails} />
}
