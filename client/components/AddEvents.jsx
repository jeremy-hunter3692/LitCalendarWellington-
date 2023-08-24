import React, { useState } from 'react'
import Popup from './PopupEvent'
const eventType = ['Book Launch', 'Author Talk', 'other']

const initDetails = {
  month: 'January',
  date: '1',
  hour: '0',
  year: new Date().getFullYear(),
  minutes: '0',
  endHours: '0',
  endMinutes: '0',
  title: '',
  type: 'Book Launch',
  link: '',
  location: '',
  imageURL: '',
  about: '',
  facebook: '',
  instagram: '',
  twitter: '',
  typeother: '',
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const toBeDeleted = [
  'year',
  'date',
  'month',
  'hour',
  'minutes',
  'endMinutes',
  'endHours',
]

const hours = Array(24)
  .fill(0)
  .map((_, idx) => idx)

const minutes = Array(12)
  .fill(0)
  .map((_, idx) => idx * 5)

function daysInMonth(month) {
  return new Date(2023, month, 0).getDate()
}

const daysEachMonth = months.map((x, idx) => daysInMonth(idx + 1))

// const endMinutes = Array(3)
//   .fill(0)
//   .map((_, idx) => idx * 15)

export default function AddEvent({ eventsSetter, showAddEventSetter }) {
  const [form, setForm] = useState(initDetails)
  const [disabled, setDisabled] = useState(true)
  console.log(form)

  function getMonthIdx(month) {
    return months.findIndex((x) => x === month)
  }

  function makeDateObject({ year, month, date, hour, minutes }) {
    const deStringedMonth = getMonthIdx(month)
    return new Date(year, deStringedMonth, date, hour, minutes)
  }

  function handleChange(e) {
    const { name, value } = e.target
    //For other option input on type select
    let tempObj = {}
    switch (true) {
      case value === 'other':
        setDisabled(false)
        setForm({ ...form, [name]: value })
        break
      case name === 'type' && value !== 'other':
        setDisabled(true)
        setForm({ ...form, [name]: value, typeother: '' })
        break
      case name === 'endHours':
        //would need to set endHour etc first?
        tempObj = makeDateObject({
          ...form,
          hour: value,
          minutes: form.endMinutes,
        })
        setForm({ ...form, [name]: value, end: tempObj })
        break
      case name === 'endMinutes':
        //would need to set endHour etc first?
        tempObj = makeDateObject({
          ...form,
          hour: form.endHours,
          minutes: value,
        })
        setForm({ ...form, [name]: value, end: tempObj })
        break
      case toBeDeleted.includes(name):
        tempObj = makeDateObject({ ...form, [name]: value })
        setForm({ ...form, [name]: value, start: tempObj })
        break
      default:
        setForm({ ...form, [name]: value })
    }

    // if (value === 'other') {
    //   setDisabled(false)
    // }
    // if (name === 'type' && value !== 'other') {
    //   setDisabled(true)
    //   setForm({ ...form, [name]: value, typeother: '' })
    // } else {
    //   //TODO REFACTOR? - this is to update the time imeditaly with preivew
    //   let tempObj = makeDateObject({ ...form, [name]: value })
    //   setForm({ ...form, [name]: value, start: tempObj })
    //  ///end stufff
    // let result = makeDateObject({
    //   ...form,
    //   hour: form.end,
    //   minutes: form.endMinutes,
    // })

    // }
  }

  function handleSubmit(e) {
    e.preventDefault()
    //Reminder events must be an array for the calendar
    let input = [{ ...form }]
    delete input[0].month
    delete input[0].date
    delete input[0].hour
    delete input[0].year
    delete input[0].minutes

    //TO DO Check this
    form.typeother !== '' ? (input.type = input.typeother) : ' '
    //TO DO /\/\/\/\
    eventsSetter(input)
    showAddEventSetter()
  }

  function getDaysOfSelectedMonth(month) {
    let numbers = []
    if (month) {
      const idx = getMonthIdx(month)
      numbers = Array(daysEachMonth[idx])
        .fill(0)
        .map((_, idx) => idx + 1)
    }
    return (
      <label htmlFor="date">
        Date:
        <select
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        >
          <option value="Date:" disabled>
            Date:
          </option>
          {numbers.map((x) => (
            <option key={x} value={x} title={x}>
              {x}
            </option>
          ))}
        </select>
      </label>
    )
  }

  //TO DO:
  //stop social media favicons changing size: set max size?
  //and end time form to add events
  // notes contact/organiser form
  // contact details for submiter to moderator
  // add extra contacts
  // online vs irl vs both - button
  //cost?
  // reoccuring event? i.e. book club
  //Uploading image to some where/storage generally
  //multiple images in preview?
  //Full css work for the pop up
  //save regular organiser/submitters ?
  //save new ?
  //some way to differentiate

  return (
    <div>
      <form className="AddEvent">
        <div>
          <label htmlFor="month">
            Month:
            <select
              id="month"
              name="month"
              value={form.month}
              onChange={handleChange}
              required
            >
              <option value="Month:" disabled>
                Month:
              </option>
              {months.map((x) => (
                <option key={x} value={x} title={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>
          {getDaysOfSelectedMonth(form.month)}
          <label htmlFor="hour">
            Hour:
            <select
              id="hour"
              name="hour"
              value={form.hour}
              onChange={handleChange}
              required
            >
              <option value="Hour:" disabled>
                Hour:
              </option>
              {hours.map((x) => (
                <option key={x} value={x} title={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="minutes">
            Minutes:
            <select
              id="minutes"
              name="minutes"
              value={form.minutes}
              onChange={handleChange}
              required
            >
              <option value="Minutes:" disabled>
                Minutes:
              </option>
              {minutes.map((x) => (
                <option key={x} value={x} title={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="endHours">
            Till:
            <select
              id="endHours"
              name="endHours"
              value={form.endHours}
              onChange={handleChange}
              required
            >
              <option value="Length:" disabled>
                Hours
              </option>
              {hours.map((x) => (
                <option key={x} value={x} title={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>

          <select
            id="endMinutes"
            name="endMinutes"
            value={form.endMinutes}
            onChange={handleChange}
            required
          >
            <option value="minutes:" disabled>
              Minutes:
            </option>
            {minutes.map((x) => (
              <option key={x} value={x} title={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
        Other Details///
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          onChange={handleChange}
          value={form.title}
          name="title"
          required
          placeholder="Title"
        />
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          onChange={handleChange}
          value={form.location}
          name="location"
          required
          placeholder="Location"
        />
        <label htmlFor="link">Link:</label>
        <input
          id="link"
          onChange={handleChange}
          value={form.link}
          name="link"
          placeholder="link"
        />
        <label htmlFor="type">
          Event Type:
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="Choose type" disabled>
              Choose type
            </option>
            {eventType.map((x) => (
              <option key={x} value={x} title={x}>
                {x}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="typeother">Other:</label>
        <input
          id="typetother"
          onChange={handleChange}
          value={form.typeother}
          name="typeother"
          placeholder="other event type"
          disabled={disabled}
        />
        <div className="textarea">
          <div>
            <label htmlFor="about">About:</label>
          </div>
          <textarea
            id="about"
            onChange={handleChange}
            value={form.about}
            name="about"
            required
            placeholder="this text will be cut off at 300 characters in the pop up"
          />
        </div>
        <h4>Social links:</h4>
        <label htmlFor="facebook">Facebook:</label>
        <input
          id="facebook"
          onChange={handleChange}
          value={form.facebook}
          name="facebook"
          placeholder="facebook"
        />
        <label htmlFor="instagram">Instagram:</label>
        <input
          id="instagram"
          onChange={handleChange}
          value={form.instagram}
          name="instagram"
          placeholder="Instagram"
        />
        <label htmlFor="twitter">Twitter:</label>
        <input
          id="twitter"
          onChange={handleChange}
          value={form.twitter}
          name="twitter"
          placeholder="twitter"
        />
        <button onClick={handleSubmit}>Save Event </button>
      </form>
      <Popup details={form} />
    </div>
  )
}

// reference data shape {
//   title: 'Kates Kalandar',
//   start: now,
//   end: end,
//   type: 'author talk',
//   location: 'unity books',
//   imageURL: 'www.whatever',
//   about:
//     'blah blah blah blah blah ablha baluhablah ablhab lahb ablbablahblab albhalbalh a balh bab ahb lahb al hbal hbalb alhb a hbal balhb alhb ahlb ',

//   sociallinks: {
//     facebook: 'www.f',
//     instagram: 'www.i',
//     twitter: 'www.t',
//   },
// }
