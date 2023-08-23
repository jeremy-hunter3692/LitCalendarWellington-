import React, { useState } from 'react'
const initStyle = {
  margin: 0,
  padding: 0,
  position: 'relative',
  width: '20rem',
  height: '30rem',
  left: 50,
  top: 50,
}

export default function Popup({ details, styleData, close }) {
  const [style, setStyle] = useState(styleData || initStyle)
  // /TO DO DOUBLE this works/resets with the close button and render
  // SET A BOOL for preview mode? Is that more effcient and/or readable
  // preview 'mode' bool would basically be styleData === init style
  const [fullScreen, setFullScreen] = useState(false)

  function clickThrough() {
    setStyle({
      margin: 0,
      padding: 0,
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      left: 0,
      top: 0,
    })
    setFullScreen(true)
  }

  function handleClose() {
    //come back to this - a way to make the close button revert to intil mouse position give
    !fullScreen ? close() : setFullScreen(false)
    setStyle(styleData)
  }

  const date = details.start?.toDateString()
  //TO DO DOUBLECheck this doesn't mess anything up
  const time = details.start?.toLocaleTimeString('en-US')
  const timeFixed = time?.slice(0, -6) + time?.slice(-2)

  const about =
    !(details.about.length > 300) && !fullScreen
      ? details.about
      : details.about.slice(0, 300)

  return (
    <>
      <div style={style}>
        <div className="popup">
          {!(style === initStyle) ? (
            <>
              <button onClick={handleClose}>X</button>
              {!fullScreen && <button onClick={clickThrough}>more</button>}
            </>
          ) : (
            ' '
          )}
          <div className="licontainer">
            <ul>
              <li>
                {' '}
                <strong>{details.title} </strong> | {date} | at {timeFixed}
              </li>
              <li>
                Location: {details.location} | {details.type}
              </li>
              <li>
                <a href={details.link}>Link: {details.link}</a>
              </li>
              <img src="cover.png" alt="book cover" width="30%"></img>
              <li>
                <p>
                  {about}
                  {details.about.length > 300 && !fullScreen ? (
                    <button onClick={clickThrough}>more</button>
                  ) : (
                    ''
                  )}
                </p>
              </li>
            </ul>
            <div className="sociallistcont">
              <ul className="sociallist">
                {details.facebook && (
                  <li>
                    <a href={details.facebook}>
                      <img
                        src="Colored_Facebook3_svg-256.webp"
                        alt="facebook"
                      ></img>
                      {details.facebook}
                    </a>
                  </li>
                )}
                {details.instagram && (
                  <li>
                    <a href={details.instagram}>
                      <img
                        src="1_Instagram_colored_svg_1-256.webp"
                        alt="instagram"
                      ></img>
                      {details.instagram}
                    </a>
                  </li>
                )}
                {details.twitter && (
                  <li>
                    <a href={details.twitter}>
                      <img
                        src="1_Twitter3_colored_svg-256.webp"
                        alt="twitter"
                      ></img>
                      {details.twitter}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
