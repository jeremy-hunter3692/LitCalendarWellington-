import React from 'react'

export default function Popup({ details }) {
  const socials = details.sociallinks

  return (
    <>
      <div>
        <header>Event pop up card</header>
        <li>{details.title} </li>
        <li> {details.location}</li>
        <li> {details.type}</li>
        <li>{socials.instagram}</li>
        <li>{socials.facebook}</li>
        <li>{socials.twitter}</li>
      </div>
    </>
  )
}
