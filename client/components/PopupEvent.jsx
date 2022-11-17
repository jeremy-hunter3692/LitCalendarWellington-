import React, { useState } from 'react'

export default function Popup({ details, styleData, click }) {
  const absolute = 'absolute'
  const socials = details.sociallinks
  const [style, setStyle] = useState({
    position: absolute,
    left: styleData.x > 650 ? styleData.x - 400 : styleData.x,
    top: styleData.y > 470 ? styleData.y - 300 : styleData.y,
  })
  console.log('STYLE', style, details)

  return (
    <>
      <div style={style}>
        <div className="popup">
          <button onClick={click}>X</button>
          <div className="licontainer">
            <ul>
              <li>{details.title} </li>
              <li>
                Location: {details.location} | {details.type}
              </li>
              <li>Link: </li>
              <img src="cover.png" alt="book cover" width="30%"></img>
            </ul>
          </div>

          <div className="sociallistcont">
            <ul className="sociallist">
              <li>{socials.instagram}</li>
              <li>{socials.facebook}</li>
              <li>{socials.twitter}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
