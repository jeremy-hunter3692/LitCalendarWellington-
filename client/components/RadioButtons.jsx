import React from 'react'

export default function RadioButtons({ id, handleChange, value, form }) {
  return (
    <>
      {' '}
      <input
        type="radio"
        name="inperson"
        value={value}
        id={id}
        checked={form.inperson === value}
        onChange={handleChange}
      />
      <label htmlFor={id}>{value}</label>
    </>
  )
}
