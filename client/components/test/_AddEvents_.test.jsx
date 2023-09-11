import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddEvent from '../AddEvents'
import userEvent from '@testing-library/user-event'

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
    const month = getByRole('combobox', { name: /Month/i })
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

describe('form test', () => {
  const onSubmit = jest.fn()
  const user = userEvent.setup()
  const mockSet = jest.fn()
  beforeEach(() => {
    onSubmit.mockClear()
    render(<AddEvent eventsSetter={onSubmit} showAddEventSetter={mockSet} />)
  })

  test('submits form in correct data shape', async () => {
    const yearNow = new Date().getFullYear()
    const title = screen.getByRole('textbox', { name: /title/i })
    await user.type(title, 'Kates Event')
    const location = screen.getByRole('textbox', { name: /location/i })
    await user.type(location, 'a bookstore')
    const link = screen.getByRole('textbox', { name: /link/i })
    await user.type(link, 'www.stuff.co.nz')
    const facebook = screen.getByRole('textbox', { name: /facebook/i })
    await user.type(facebook, 'www.facebook.com')
    const about = screen.getByRole('textbox', { name: /about/i })
    await user.type(about, 'some words that will be in the about section')
    const twitter = screen.getByRole('textbox', { name: /twitter/i })
    await user.type(twitter, 'www.twitter.com')
    const instagram = screen.getByRole('textbox', { name: /instagram/i })
    await user.type(instagram, 'www.instagram.com')
    const contact = screen.getByRole('textbox', { name: 'Contact' })
    await user.type(contact, 'Person1')
    const altContact = screen.getByRole('textbox', {
      name: 'AlternativeContact',
    })
    await user.type(altContact, 'Person2')
    const organisation = screen.getByRole('textbox', {
      name: 'Organisation',
    })
    await user.type(organisation, 'Place1')

    fireEvent.click(screen.getByRole('button', { name: /save event/i }))
    // expect(title.value).toBe('Kates Event')
    expect(onSubmit).toHaveBeenCalledWith([
      {
        month: 'January',
        date: '1',
        hour: '0',
        year: yearNow,
        start: new Date(yearNow, '01', '00', '00'),
        end: new Date(yearNow, '01', '01', '00'),
        minutes: '0',
        endHours: '0',
        endMinutes: '0',
        title: 'Kates Event',
        type: 'Book Launch',
        link: 'www.stuff.co.nz',
        location: 'a bookstore',
        imageURL: '',
        about: 'some words that will be in the about section',
        facebook: 'www.facebook.com',
        instagram: 'www.instagram.com',
        twitter: 'www.twitter.com',
        typeother: '',
        inperson: 'In Person',
        cost: '',
        modNotes: {
          AlternativeContact: 'Person2',
          Contact: 'Person1',
          Organisation: 'Place1',
        },
        koha: false,
        buyTixLink: '',
        unwagedCost: '',
      },
    ])
  })
})

// function getTitle() {
//   return screen.getByRole('textbox', { name: /title/i })
// }
// function getLocation() {
//   return screen.getByRole('textbox', { name: /location/i })
// }
// function getAbout() {
//   return screen.getByRole('textbox', { name: /about/i })
// }
// function madeUp() {
//   return screen.getByRole('textbox', { name: /madeup/i })
// }
