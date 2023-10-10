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

    const radio = getAllByRole('radio')
    const notesForMod = getByText('Extra notes for moderator')
    const social1 = getByText('Facebook')
    const social2 = getByText('Instagram')
    const social3 = getByText('Twitter')
    const title = getByText('Title')
    const location = getByRole('textbox', { name: 'Location' }) //getByLabelText('Month:')
    const cost = getByRole('textbox', { name: 'cost' })
    const cost2 = getByLabelText('Cost: $')
    const date = getByLabelText('Date:')
    const month = getByRole('combobox', { name: /Month/i })
    const checkBox = getByRole('checkbox', { name: /Koha?/i })

    expect(notesForMod).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(location).toBeInTheDocument()
    expect(date).toBeInTheDocument()

    expect(radio[0].id).toBe('inperson')
    expect(radio[1].id).toBe('online/stream')
    expect(radio[2].id).toBe('both')
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
    const month = screen.getByRole('combobox', { name: /month/i })
    await user.selectOptions(month, 'March')
    const date = screen.getByRole('combobox', { name: 'Date:' })
    await user.selectOptions(date, '10')
    const hour = screen.getByRole('combobox', { name: 'Hour:' })
    await user.selectOptions(hour, '18')
    const mins = screen.getByRole('combobox', { name: 'Minutes:' })
    await user.selectOptions(mins, '30')
    //THIS IS TOO FRAGILE WILL CHANGE
    const endMins = screen.getByRole('combobox', { name: 'EndMins' })
    await user.selectOptions(endMins, '30')
    const endHour = screen.getByRole('combobox', { name: 'Till' })
    await user.selectOptions(endHour, '19')
    const title = screen.getByRole('textbox', { name: /title/i })
    await user.type(title, 'Kates Event')
    const location = screen.getByRole('textbox', { name: /location/i })
    await user.type(location, 'a bookstore')

    const link = screen.getByRole('textbox', { name: /link/i })
    await user.type(link, 'www.stuff.co.nz')
    const type = screen.getByRole('combobox', { name: 'Type:' })
    await user.selectOptions(type, 'Reading')

    const cost = screen.getByRole('textbox', {
      name: 'cost',
    })
    await user.type(cost, '10')
    const optionalCost = screen.getByRole('textbox', {
      name: 'Optional unwaged cost: $',
    })
    await user.type(optionalCost, '5')
    const buyTix = screen.getByRole('textbox', { name: /Link to buy tickets/i })
    await user.type(buyTix, 'www.stuff.co.nz')
    const about = screen.getByRole('textbox', { name: /about/i })
    await user.type(about, 'some words that will be in the about section')

    const facebook = screen.getByRole('textbox', { name: /facebook/i })
    await user.type(facebook, 'www.facebook.com')
    const twitter = screen.getByRole('textbox', { name: /twitter/i })
    await user.type(twitter, 'www.twitter.com')
    const instagram = screen.getByRole('textbox', { name: /instagram/i })
    await user.type(instagram, 'www.instagram.com')
    const contact = screen.getByRole('textbox', { name: 'Contact' })
    await user.type(contact, 'Person1')

    const altContact = screen.getByRole('textbox', {
      name: 'Alternative Contact',
    })
    await user.type(altContact, 'Person2')
    const organisation = screen.getByRole('textbox', {
      name: 'Organisation',
    })
    await user.type(organisation, 'Place1')
    const extranotes = screen.getByRole('textbox', {
      name: 'Extra notes for moderator',
    })
    await user.type(extranotes, 'notes in extra notes mod')

    const year = new Date().getFullYear()
    const start = new Date(2023, 2, 10, 18, 30)
    const end = new Date(2023, 2, 10, 19, 30)
    // const start = new Date(year)

    fireEvent.click(screen.getByRole('button', { name: /save event/i }))
    // expect(title.value).toBe('Kates Event')
    expect(onSubmit).toHaveBeenCalledWith([
      {
        // month: 'March',
        // date: '10',
        // hour: '18',
        // year: new Date().getFullYear(),
        start: start,
        end: end,
        // minutes: '30',
        // endHours: '19',
        // endMinutes: '30',
        title: 'Kates Event',
        type: 'Reading',
        link: 'www.stuff.co.nz',
        location: 'a bookstore',
        imageURL: '',
        about: 'some words that will be in the about section',
        facebook: 'www.facebook.com',
        instagram: 'www.instagram.com',
        twitter: 'www.twitter.com',
        typeother: '',
        inperson: 'In Person',
        cost: '10',
        modNotes: {
          alternativeContact: 'Person2',
          contact: 'Person1',
          organisation: 'Place1',
          extranotes: 'notes in extra notes mod',
        },
        koha: false,
        buyTixLink: 'www.stuff.co.nz',
        unwagedCost: '5',
      },
    ])
  })

  test('correct shape with type Other and Koha checked', async () => {
    const month = screen.getByRole('combobox', { name: /month/i })
    await user.selectOptions(month, 'March')
    const date = screen.getByRole('combobox', { name: 'Date:' })
    await user.selectOptions(date, '10')
    const hour = screen.getByRole('combobox', { name: 'Hour:' })
    await user.selectOptions(hour, '18')
    const mins = screen.getByRole('combobox', { name: 'Minutes:' })
    await user.selectOptions(mins, '30')
    //THIS IS TOO FRAGILE WILL CHANGE
    const endMins = screen.getByRole('combobox', { name: 'EndMins' })
    await user.selectOptions(endMins, '30')
    const endHour = screen.getByRole('combobox', { name: 'Till' })
    await user.selectOptions(endHour, '19')
    const title = screen.getByRole('textbox', { name: /title/i })
    await user.type(title, 'Kates Event')
    const location = screen.getByRole('textbox', { name: /location/i })
    await user.type(location, 'a bookstore')
    const link = screen.getByRole('textbox', { name: /link/i })
    await user.type(link, 'www.stuff.co.nz')
    const type = screen.getByRole('combobox', { name: 'Type:' })
    await user.selectOptions(type, 'Other')
    const other = screen.getByPlaceholderText('other event type here')
    await user.type(other, 'othertext')
    const koha = screen.getByRole('checkbox', { name: /koha?/i })
    await user.click(koha)
    const cost = screen.getByRole('textbox', {
      name: 'cost',
    })
    await user.type(cost, '10')
    const radio = screen.getByRole('radio', { name: 'Both' })
    await user.click(radio)
    const about = screen.getByRole('textbox', { name: /about/i })
    await user.type(about, 'some words that will be in the about section')

    const facebook = screen.getByRole('textbox', { name: /facebook/i })
    await user.type(facebook, 'www.facebook.com')
    const twitter = screen.getByRole('textbox', { name: /twitter/i })
    await user.type(twitter, 'www.twitter.com')
    const instagram = screen.getByRole('textbox', { name: /instagram/i })
    await user.type(instagram, 'www.instagram.com')
    const contact = screen.getByRole('textbox', { name: 'Contact' })
    await user.type(contact, 'Person1')

    const altContact = screen.getByRole('textbox', {
      name: 'Alternative Contact',
    })
    await user.type(altContact, 'Person2')
    const organisation = screen.getByRole('textbox', {
      name: 'Organisation',
    })
    await user.type(organisation, 'Place1')
    const year = new Date().getFullYear()
    const start = new Date(2023, 2, 10, 18, 30)
    const end = new Date(2023, 2, 10, 19, 30)
    // const start = new Date(year)

    fireEvent.click(screen.getByRole('button', { name: /save event/i }))
    // expect(title.value).toBe('Kates Event')
    expect(onSubmit).toHaveBeenCalledWith([
      {
        // month: 'March',
        // date: '10',
        // hour: '18',
        // year: new Date().getFullYear(),
        start: start,
        end: end,
        // minutes: '30',
        // endHours: '19',
        // endMinutes: '30',
        title: 'Kates Event',
        type: 'Other',
        link: 'www.stuff.co.nz',
        location: 'a bookstore',
        imageURL: '',
        about: 'some words that will be in the about section',
        facebook: 'www.facebook.com',
        instagram: 'www.instagram.com',
        twitter: 'www.twitter.com',
        typeother: 'othertext',
        inperson: 'Both',
        cost: '10',
        modNotes: {
          alternativeContact: 'Person2',
          contact: 'Person1',
          organisation: 'Place1',
        },
        koha: true,
        buyTixLink: null,
        unwagedCost: '',
      },
    ])
  })
})
