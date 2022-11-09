import React from 'react'

export default function Popup({ details }) {
  console.log(details)
  return (
    <>
      <div className="nav">
        <header>Event pop up card</header>
        <li>{details.title} </li>
        <li> {details.location}</li>
        <li> {details.type}</li>
        <li>{details.socialinks?.instagram}</li>
      </div>
    </>
  )
}
