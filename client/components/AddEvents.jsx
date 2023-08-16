import React, { useState } from 'react'

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

export default function AddEvent({ eventsSetter }) {
  //TO DO:::::::make a micro date picker and time dropdowns etc
  const [form, setForm] = useState({})
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
  }

  function handleChange(e) {
    console.log(form)
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
        <label htmlFor="about">About:</label>
        <input
          id="about"
          onChange={handleChange}
          // value={newEvent.about}
          name="about"
          required
          placeholder="About"
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
          Type:
          <select
            id="type"
            name="type"
            value={form.type}
            defaultValue="choose type"
            onChange={handleChange}
            required
          >
            {eventType.map((x) => (
              <option key={x} value={x} title="type">
                {x}
              </option>
            ))}
          </select>
        </label>

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
    </>
  )
}
