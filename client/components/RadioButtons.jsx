import React, { Fragment } from 'react'

export default function RadioButtons({ radioDataObj, handleChange, form }) {
  function radioGen({ id, value }) {
    return (
      <>
        <li className="radioli">
          {' '}
          <input
            type="radio"
            name="inperson"
            value={value}
            id={id}
            aria-checked={form.inperson === value}
            checked={form.inperson === value}
            onChange={handleChange}
          />
          <label htmlFor={id}>{value}</label>
        </li>
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
