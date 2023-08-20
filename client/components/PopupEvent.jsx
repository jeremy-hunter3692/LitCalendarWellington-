import React, { useState, useEffect } from 'react'
const initStyle = {
  margin: 0,
  padding: 0,
  position: 'relative',
  left: 50,
  top: 50,
}
//TO DO: FIX THE DISPLAY OF THE SECONDS IN TIME PART
export default function Popup({ details, styleData, click }) {
  const [style, setStyle] = useState(styleData || initStyle)

  const about =
    details.about.length > 300 ? details.about.slice(0, 300) : details.about

  return (
    <>
      <div style={style}>
        <div className="popup">
          <button onClick={click}>X</button>
          <div className="licontainer">
            <ul>
              <li>
                {' '}
                <strong>{details.title} </strong> | At{' '}
                {details.start?.toDateString()} {'||'}
                {details.start?.toLocaleTimeString('en-US')}
              </li>
              <li>
                Location: {details.location} | {details.type}
              </li>
              <li>Link: {details.link} </li>
              <img src="cover.png" alt="book cover" width="30%"></img>
              <li>
                <p>{about}...</p>
              </li>
            </ul>
            <div className="sociallistcont">
              <ul className="sociallist">
                <li>
                  <img
                    src="Colored_Facebook3_svg-256.webp"
                    alt="facebook"
                  ></img>
                  {details.facebook}
                </li>
                <li>
                  <img
                    src="1_Instagram_colored_svg_1-256.webp"
                    alt="instagram"
                  ></img>
                  {details.instagram}
                </li>

                <li>
                  <img
                    src="1_Twitter3_colored_svg-256.webp"
                    alt="twitter"
                  ></img>
                  {details.twitter}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
