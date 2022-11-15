import React, { useState } from 'react'

export default function Popup({ details, styleData, click }) {
  const absolute = 'absolute'
  const socials = details.sociallinks
  const [style, setStyle] = useState({
    position: absolute,
    left: styleData.x > 650 ? styleData.x - 400 : styleData.x,
    top: styleData.y > 470 ? styleData.y - 300 : styleData.y,
  })
  console.log('STYLE', style)

  return (
    <>
      <div style={style}>
        <div className="popup">
          <button onClick={click}>x</button>

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
