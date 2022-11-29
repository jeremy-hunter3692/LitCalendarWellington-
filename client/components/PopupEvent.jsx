import React, { useState } from 'react'

export default function Popup({ details, styleData, click }) {
  const absolute = 'absolute'
  const socials = details.sociallinks
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
              <li>{details.title} </li>
              <li>
                Location: {details.location} | {details.type}
              </li>
              <li>Link: </li>
              <img src="cover.png" alt="book cover" width="30%"></img>
              <li>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Minima deleniti possimus doloremque fuga reprehenderit dolorum
                  obcaecati, ea est voluptas quam enim esse illum non optio
                  doloribus illo voluptatem, earum quod!
                </p>
              </li>
            </ul>

            <div className="sociallistcont">
              <ul className="sociallist">
                <li>{socials.instagram}</li>
                <li>{socials.facebook}</li>
                <li>{socials.twitter}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
