import React, { useEffect, useState } from 'react'
import FormReturn from './FormReturn'

const formNames = {
  Contact: '',
  AlternativeContact: '',
  Organisation: '',
}
export default function NotesForMod({ globalFromSetter }) {
  const [form, setForm] = useState(formNames)
  useEffect(() => {
    globalFromSetter(form)
  }, [form])

  // console.log('notes4mod', form)

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <>
      <hr></hr>
      <FormReturn
        formSet={handleChange}
        formNames={formNames}
        form={form}
      />{' '}
      <div className="textarea">
        <div>
          <label htmlFor="extranotes">Extra notes for moderator</label>
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
