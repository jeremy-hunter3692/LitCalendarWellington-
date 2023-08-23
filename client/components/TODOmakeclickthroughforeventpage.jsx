import React, { useState } from 'react'

const initDetails = {
  month: 'January',
  date: 1,
  hour: 0,
  year: new Date().getFullYear(),
  minutes: 0,
  title: '',
  type: 'Book Launch',
  link: '',
  location: '',
  imageURL: '',
  about: '',
  facebook: '',
  instagram: '',
  twitter: '',
}

export default function Test() {
  const [form, setForm] = useState({})
  // console.log(form)
  function formGen(name) {
    const nameStr = name.toString()

    return (
      <>
        <label htmlFor={nameStr}>{nameStr}</label>
        <input
          id={nameStr}
          onChange={handleChange}
          value={form[nameStr]}
          name={nameStr}
          required
          placeholder={nameStr}
        />
      </>
    )
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const names = Object.keys(initDetails)

  function makeForms() {
    return names.map((x) => {
      // console.log(formGen(x))
      return formGen(x)
    })
  }

  return <>{makeForms()}</>
  //
}
