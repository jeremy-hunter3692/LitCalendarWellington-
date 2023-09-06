import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddEvent from '../AddEvents'

describe('renders child components', () => {
  test('renders form correctly with children', () => {
    const { getByLabelText, getByText, getByRole } = render(<AddEvent />)

    const radio1 = getByText('In Person')
    const radio2 = getByText('On line/streamed')
    const radio3 = getByText('Both')
    const notesForMod = getByText('Extra notes for moderator')
    const social1 = getByText('facebook')
    const social2 = getByText('instagram')
    const social3 = getByText('twitter')
    const title = getByText('title')
    const month = getByLabelText('Month:')
    const date = getByLabelText('Date:')
    const checkBox = getByRole('checkbox', { name: /Koha?/i })

    expect(notesForMod).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(month).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(radio1).toBeInTheDocument()
    expect(radio2).toBeInTheDocument()
    expect(radio3).toBeInTheDocument()
    expect(social1).toBeInTheDocument()
    expect(social2).toBeInTheDocument()
    expect(social3).toBeInTheDocument()
    expect(checkBox).toBeInTheDocument()
  })
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
