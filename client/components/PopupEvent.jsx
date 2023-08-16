import React, { useState } from 'react'

export default function Popup({ details, styleData, click }) {
  const absolute = 'absolute'

  const [style, setStyle] = useState({
    margin: 0,
    padding: 0,
    position: absolute,
    left: styleData.x > 650 ? styleData.x - 400 : styleData.x,
    top: styleData.y > 470 ? styleData.y - 300 : styleData.y,
  })

  return (
    <>
      <div style={style}>
        <div className="popup">
          <button onClick={click}>X</button>
          <div className="licontainer">
            <ul>
              <li>
                {' '}
                <strong>{details.title} </strong>
              </li>
              <li>
                Location: {details.location} | {details.type}
              </li>
              <li>Link: {details.link} </li>
              <img src="cover.png" alt="book cover" width="30%"></img>
              <li>
                <p>{details.about}</p>
              </li>
            </ul>

            <div className="sociallistcont">
              <ul className="sociallist">
                <li>{details.sociallinks.instagram}</li>
                <li>{details.sociallinks.facebook}</li>
                <li>{details.sociallinks.twitter}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
