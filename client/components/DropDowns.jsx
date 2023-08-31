import React from 'react'

export default function DropDowns({ formSet, form, data, label, name }) {
  function handleChange(e) {
    formSet(e)
  }

  // function formGen(form) {}
  //If it's an object getting pased use this:
  // const names = Object.keys(formNames)

  // function makeForms() {
  //   return names.map((x) => {
  //     return <div key={x}> {formGen(x)} </div>
  //   })
  // }

  return (
    <>
      <select
        id={name}
        name={name}
        value={form[name]}
        onChange={handleChange}
        required
      >
        <option value={label} disabled>
          {label}
        </option>
        {data.map((x) => (
          <option key={x} value={x} title={x}>
            {x}
          </option>
        ))}
      </select>
    </>
  )
}
