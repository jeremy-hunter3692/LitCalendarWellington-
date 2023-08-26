import React, { useState } from 'react'
import Test from './TestFormReturn'

const formNames = {
  Contact: '',
  AlternativeContact: '',
  Organisation: '',
}
export default function NotesForMod() {
  const [form, setForm] = useState(formNames)
  // console.log(form)

  function handleChange(e) {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })
  }

  return (
    <>
      <hr></hr>
      <Test formSet={handleChange} formNames={formNames} form={form} />{' '}
      <div className="textarea">
        <div>
          <label htmlFor="extranotes">About:</label>
        </div>
        <textarea
          id="extranotes"
          onChange={handleChange}
          value={form.about}
          name="extranotes"
          required
          placeholder="Any extra details you would like to go to the mod"
        />
      </div>
    </>
  )
}
