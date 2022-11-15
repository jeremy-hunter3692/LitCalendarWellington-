import React, { useState } from 'react'

export default function Popup({ details, styleData, click }) {
  const absolute = 'absolute'
  const socials = details.sociallinks
  const [style, setStyle] = useState({
    position: absolute,
    left: styleData.x,
    top: styleData.y,
  })
  console.log('STYLE', style)

  return (
    <>
      <div style={style}>
        <div className="popup">
          <button onClick={click}>x</button>
          <header>Event pop up card</header>
          <li>{details.title} </li>
          <li> {details.location}</li>
          <li> {details.type}</li>
          <li>{socials.instagram}</li>
          <li>{socials.facebook}</li>
          <li>{socials.twitter}</li>
        </div>
      </div>
    </>
  )
}
