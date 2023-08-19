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
  title: '',
  start: new Date(),
  end: new Date(),
  type: '',
  location: '',
  imageURL: '',
  about: 'placeholder',
  sociallinks: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
}

export default function AddEvent({ eventsSetter, showAddEventSetter }) {
  //TO DO:::::::make a micro date picker and time dropdowns etc
  const [form, setForm] = useState(initDetails)
  // const newEvent = {}

  function handleSubmit(e) {
    e.preventDefault()

    let input = [{ ...form, start: new Date() }]
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

    input[0].end = new Date()
    let hour = input[0].end.getHours() + 4
    input[0].end.setHours(hour)
    console.log('presave input', input)
    eventsSetter(input)
    showAddEventSetter()
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <form className="AddEvent">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          onChange={handleChange}
          // value={newEvent.title}
          name="title"
          required
          placeholder="Title"
        />

        <label htmlFor="location">Location:</label>
        <input
          id="location"
          onChange={handleChange}
          // value={newEvent.location}
          name="location"
          required
          placeholder="Location"
        />
        <label htmlFor="link">Link:</label>
        <input
          id="link"
          onChange={handleChange}
          // value={newEvent.twitter}
          name="link"
          placeholder="link"
        />

        <label htmlFor="type">
          Event Type:
          <select
            id="type"
            name="type"
            value={form.type}
            defaultValue=""
            onChange={handleChange}
            required
          >
            <option value="" disabled>
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
            // value={newEvent.about}
            name="about"
            required
            placeholder="this text will be cut off at 400 characters in the pop up"
          />
        </div>
        <h4>Social links:</h4>
        <label htmlFor="facebook">Facebook:</label>

        <input
          id="facebook"
          onChange={handleChange}
          // value={newEvent.facebook}
          name="facebook"
          placeholder="facebook"
        />
        <label htmlFor="instagram">Instagram:</label>
        <input
          id="instagram"
          onChange={handleChange}
          // value={newEvent.instagram}
          name="instagram"
          placeholder="Instagram"
        />

        <label htmlFor="twitter">Twitter:</label>
        <input
          id="twitter"
          onChange={handleChange}
          // value={newEvent.twitter}
          name="twitter"
          placeholder="twitter"
        />

        <button onClick={handleSubmit}>Save Event </button>
      </form>
      <Popup details={form} />
    </>
  )
}
