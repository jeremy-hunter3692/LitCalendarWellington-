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

export default function AddEvent() {
  const [form, setForm] = useState({})

  const newEvent = {}
  function handleSubmit() {}
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(form)
  }

  return (
    <>
      <h1>HI</h1>
      <form onSubmit={handleSubmit} className="AddEvent">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          onChange={handleChange}
          value={newEvent.title}
          name="title"
          required
          placeholder="Title"
        />

        <label htmlFor="location">Location:</label>
        <input
          id="location"
          onChange={handleChange}
          value={newEvent.location}
          name="location"
          required
          placeholder="Location"
        />
        <label htmlFor="about">About:</label>
        <input
          id="about"
          onChange={handleChange}
          value={newEvent.about}
          name="about"
          required
          placeholder="About"
        />
        <h4>Social links:</h4>
        <label htmlFor="facebook">Facebook:</label>
        <input
          id="facebook"
          onChange={handleChange}
          value={newEvent.sociallinks?.facebook}
          name="facebook"
          required
          placeholder="facebook"
        />
        <label htmlFor="instagram">Instagram:</label>
        <input
          id="instagram"
          onChange={handleChange}
          value={newEvent.sociallinks?.instagram}
          name="instagram"
          required
          placeholder="Instagram"
        />

        <label htmlFor="twitter">Twitter:</label>
        <input
          id="twitter"
          onChange={handleChange}
          value={newEvent.sociallinks?.twitter}
          name="twitter"
          required
          placeholder="twitter"
        />
      </form>
    </>
  )
}
