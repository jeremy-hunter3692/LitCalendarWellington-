import React, { Fragment } from 'react'

export default function FromReturn({ formNames, formSet, form }) {
  function handleChange(e) {
    formSet(e)
  }

  function formGen({ name, label }) {
    return (
      <>
        <label htmlFor={name}> {label} </label>
        <input
          id={name}
          onChange={handleChange}
          value={form[name]}
          name={name}
          placeholder={name}
        />
      </>
    )
  }

  function makeForms() {
    return formNames.map((x) => {
      return <Fragment key={x.name}> {formGen(x)} </Fragment>
    })
  }

  return <>{makeForms()}</>
}
