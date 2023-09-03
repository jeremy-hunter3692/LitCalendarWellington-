import React from 'react'

export default function FromReturn({ formNames, formSet, form }) {
  function handleChange(e) {
    formSet(e)
  }

  function formGen(name) {
    const nameStr = name.toString()
    return (
      <>
        <label htmlFor={nameStr}> {nameStr} </label>
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
      return <> {formGen(x)} </>
    })
  }4

  return <>{makeForms()}</>
}
