import React from 'react'

export default function Test({ formNames, formSet, form }) {
  function formGen(name) {
    const nameStr = name.toString()

    return (
      <>
        <label htmlFor={nameStr}>{nameStr}</label>
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

  function handleChange(e) {
    formSet(e)
  }

  //if it's an object getting pased use this:
  const names = Object.keys(formNames)
  function makeForms() {
    return names.map((x) => formGen(x))
  }

  return <>{makeForms()}</>
  //
}
