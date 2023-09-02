import React from 'react'

export default function DropDowns({ formSet, form, dropData }) {
  function handleChange(e) {
    formSet(e)
  }

  // console.log(dropData)
  function makeDropDownGen({ name, label, data }) {
    return (
      <label htmlFor={name}>
        {label}
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
      </label>
    )
  }
  // If it's an object getting pased use this:
  // const names = Object.keys(formNames)

  function makeDropDowns() {
    return dropData.map((x) => {
      return <> {makeDropDownGen(x)} </>
    })
  }

  return <> {makeDropDowns()}</>

  // return (
  //   <>
  //     <select
  //       id={name}
  //       name={name}
  //       value={form[name]}
  //       onChange={handleChange}
  //       required
  //     >
  //       <option value={label} disabled>
  //         {label}
  //       </option>
  //       {data.map((x) => (
  //         <option key={x} value={x} title={x}>
  //           {x}
  //         </option>
  //       ))}
  //     </select>
  //   </>
  // )
}
