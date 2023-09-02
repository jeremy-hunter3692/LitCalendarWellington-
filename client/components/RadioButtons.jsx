import React from 'react'

export default function RadioButtons({ radioDataObj, handleChange, form }) {
  function radioGen({ id, value }) {
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

  function makeRadios() {
    return radioDataObj.map((x) => {
      return <>{radioGen(x)}</>
    })
  }

  return <>{makeRadios()}</>
}
