import React, { useState } from 'react'
import Popup from './PopupEvent'
const eventType = ['Book Launch', 'Author Talk', 'option three']
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

const initDetails = {
  month: 'January',
  date: 1,
  hour: 0,
  year: new Date().getFullYear(),
  minutes: 0,
  title: '',
  type: '',
  link: '',
  location: '',
  imageURL: '',
  about: '',
  facebook: '',
  instagram: '',
  twitter: '',
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

const hours = Array(24)
  .fill(0)
  .map((_, idx) => idx)

const minutes = Array(12)
  .fill(0)
  .map((_, idx) => idx * 5)

function daysInMonth(month) {
  return new Date(2023, month, 0).getDate()
}

const daysEachMonth = months.map((x, idx) => {
  return daysInMonth(idx + 1)
})

export default function AddEvent({ eventsSetter, showAddEventSetter }) {
  
  const [form, setForm] = useState(initDetails)
  console.log(form)

  function getMonthIdx(month) {
    return months.findIndex((x) => x === month)
  }

  function makeDateObject({ year, date, hour, minutes, month }) {
    const deStringedMonth = getMonthIdx(month)
    return new Date(year, deStringedMonth, date, hour, minutes)
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

  function handleSubmit(e) {
    e.preventDefault()
    //Reminder events must be an array for the calendar
    let input = [{ ...form }]
    input[0].sociallinks = {}

    let iterable = Object.keys(input[0])
    iterable.forEach((value) => {
      if (
        value === 'facebook' ||
        value === 'twitter' ||
        value === 'instagram'
      ) {
        input[0].sociallinks[value] = form[value]
        delete input[0][value]
      }
    })
    //Gross - TIDY
    input[0].start = makeDateObject(input[0])
    console.log('after make date', input[0].start)
    delete input[0].month
    delete input[0].date
    delete input[0].hour
    delete input[0].year
    delete input[0].minutes
    // yucky - TIDY
    const endhour = input[0].start.getHours() + 4
    input[0].end = new Date(input[0].start)
    input[0].end.setHours(endhour)
    eventsSetter(input)
    showAddEventSetter()
  }

  function handleChange(e) {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })
  }

  //TO DO: Change this to a proper controlled react form
  //Bug with Januaray/first option being default option in select/drop downs
  return (
    <div>
      <form className="AddEvent">
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
