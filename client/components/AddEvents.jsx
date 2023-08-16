import React, { useState } from 'react'

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
  const [form, setForm] = useState({})
  // const newEvent = {}

  function handleSubmit(e) {
    e.preventDefault()

    let input = [{ ...form, start: new Date() }]
    input[0].sociallinks = {}
    input[0].sociallinks.facebook = form.facebook
    input[0].sociallinks.twitter = form.twitter
    input[0].sociallinks.instagram = form.instagram
    input[0].end = new Date()
    let hour = input[0].end.getHours() + 4
    input[0].end.setHours(hour)
    delete input[0].instagram
    delete input[0].facebook
    delete input[0].twitter

    eventsSetter(input)
    console.log('submit', input)
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(form)
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
        <button onClick={handleSubmit}>Save Event</button>
      </form>
    </>
  )
}
