import React, { Fragment } from 'react'

export default function RadioButtons({ radioDataObj, handleChange, form }) {
  function radioGen({ id, value }) {
    return (
      <>
        {' '}
        <input
          type="radio"
          name="inperson"
          value={value}
          aria-labelledby={id}
          id={id}
          aria-checked={form.inperson === value}
          checked={form.inperson === value}
          onChange={handleChange}
        />
        <label htmlFor={id}>{value}</label>
      </>
    )
  }

  function makeRadios() {
    return radioDataObj.map((x) => {
      return <Fragment key={x.id}>{radioGen(x)}</Fragment>
    })
  }

  return <>{makeRadios()}</>
}
