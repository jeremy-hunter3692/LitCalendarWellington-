import React, { useEffect, useState } from 'react'
import FormReturn from './FormReturn'

const formNames = [
  { label: 'Contact', name: 'contact' },
  { label: 'Alternative Contact', name: 'alternativeContact' },
  { label: 'Organisation', name: 'organisation' },
]
const initNames = {}
formNames.forEach((x) => {
  let name = x.name
  initNames[name] = ''
})

export default function NotesForMod({ globalFromSetter, editDetails }) {
  const [form, setForm] = useState(editDetails?.modNotes || initNames)
  console.log('notes', form)
  useEffect(() => {
    globalFromSetter(form)
  }, [form])

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
          value={form.extranotes}
          name="extranotes"
          required
          placeholder="Any extra details you would like to go to the mod"
        />
      </div>
    </>
  )
}
