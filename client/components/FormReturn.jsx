import React, { Fragment } from 'react'

export default function FromReturn({ formNames, formSet, form }) {
  function handleChange(e) {
    formSet(e)
  }
  // console.log(formNames)
  function formGen(name) {
    const label = name.toString()

    const nameStr = label.toLowerCase()

    return (
      <>
        <label htmlFor={nameStr}> {label} </label>
        <input
          id={nameStr}
          onChange={handleChange}
          value={form[nameStr]}
          name={nameStr}
          placeholder={nameStr}
        />
      </>
    )
  }

  //If it's an object getting pased use this:
  const names = Object.keys(formNames)

  function makeForms() {
    return names.map((x) => {
      return <Fragment key={x}> {formGen(x)} </Fragment>
    })
  }

  return <>{makeForms()}</>
}
