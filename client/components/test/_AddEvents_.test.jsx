import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddEvent from '../AddEvents'

describe('renders child components', () => {
  test('renders form correctly with children', () => {
    const { getByLabelText, getByText, getByRole, getAllByRole } = render(
      <AddEvent />
    )

    const radio1 = getByRole('radio', { name: 'In Person' })
    const radio2 = getByRole('radio', { name: 'On line/streamed' })
    const radio3 = getByRole('radio', { name: 'Both' })
    const notesForMod = getByText('Extra notes for moderator')
    const social1 = getByText('facebook')
    const social2 = getByText('instagram')
    const social3 = getByText('twitter')
    const title = getByText('title')
    const location = getByRole('textbox', { name: 'location' }) //getByLabelText('Month:')
    const cost = getByRole('textbox', { name: 'cost' })
    const cost2 = getByLabelText('Cost: $')
    const date = getByLabelText('Date:')
    const month = getByLabelText('Month:')
    const checkBox = getByRole('checkbox', { name: /Koha?/i })

    expect(notesForMod).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(location).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(radio1).toBeInTheDocument()
    expect(radio2).toBeInTheDocument()
    expect(radio3).toBeInTheDocument()
    expect(social1).toBeInTheDocument()
    expect(social2).toBeInTheDocument()
    expect(social3).toBeInTheDocument()
    expect(checkBox).toBeInTheDocument()
    expect(month).toBeInTheDocument()
    expect(cost).toBeInTheDocument()
    expect(cost2).toBeInTheDocument()
  })
})
