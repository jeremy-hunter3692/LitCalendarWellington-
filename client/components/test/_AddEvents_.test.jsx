import React from 'react'
import { render, fireEvent, getByLabelText } from '@testing-library/react'
import '@testing-library/jest-dom'

import AddEvent from '../AddEvents'

test('renders form correctly with children', () => {
  const { getByTestId, getByLabelText, getByText } = render(<AddEvent />)

  const radio1 = getByText('In Person')
  const radio2 = getByText('On line/streamed')
  const radio3 = getByText('Both')
  const notesForMod = getByText('Extra notes for moderator') //getByLabelText('Social links:')
  const title = getByText('title')

  expect(notesForMod).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(radio1).toBeInTheDocument()
  expect(radio2).toBeInTheDocument()
  expect(radio3).toBeInTheDocument()
  // expect(1).toBe(1)
})

// month: 'January',
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
//   buyTixLink: '',
//   unwagedCost: '',
