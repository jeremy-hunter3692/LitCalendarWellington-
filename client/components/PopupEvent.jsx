import React, { useState, useEffect } from 'react'
import SocialLinks from './SocialLinks'
import PopUpImages from './PopUpImage'
const initStyle = {
  margin: 0,
  padding: 0,
  position: 'relative',
  width: '20rem',
  height: '30rem',
  left: 50,
  top: 50,
}

export default function Popup({
  details,
  styleData = { ...initStyle },
  close,
}) {
  const [style, setStyle] = useState(styleData || initStyle)

  const [fullScreen, setFullScreen] = useState(false)

  //why does this work with setInterval but not setTimeout

  function clickThrough() {
    if (style !== initStyle) {
      setStyle({
        margin: 0,
        padding: 0,
        position: 'absolute',
        width: '97vw',
        height: '95vh',
        left: 2,
        top: 3,
      })
      setFullScreen(true)
    }
  }
  // console.log(details.start, typeof details.start)
  const date = details.start.toDateString()
  //TO DO DOUBLECheck this doesn't mess anything up
  const time = details.start?.toLocaleTimeString('en-US') || ''
  const timeFixed = time?.slice(0, -6) + time?.slice(-2)
  const endTime = details.end?.toLocaleTimeString('en-US') || ''
  const endTimeFixed = endTime?.slice(0, -6) + endTime?.slice(-2)
  const unwagedDisplay = () => {
    return (
      <>
        /{details.unwagedCost}
        <i>-waged/unwaged</i>
      </>
    )
  }

  // replaced with css
  // const about =
  //   details.about?.length < 300 || fullScreen
  //     ? details.about
  //     : details.about.slice(0, 300)

  // it's less than 300 nothing

  return (
    <>
      <div style={style}>
        <div className="popup">
          <div className="licontainer">
            <div className="poptoprightbuttons">
              {style !== initStyle ? (
                <>
                  <button onClick={close}>X</button>
                  {!fullScreen && (
                    <button onClick={clickThrough}>
                      {'  '}More{'  '}
                    </button>
                  )}
                </>
              ) : (
                ' '
              )}
            </div>
            <ul>
              {' '}
              <h4>{details.title} </h4>
              {/* TO DO this should probably be for everything here rather than ecah div */}
              <div className="secondlineMoveDown">
                {' '}
                {details.type === 'Other' ? details.typeother : details.type}
                {` at ${details.location} `}
              </div>
              <div className="secondlineMoveDown">
                <i className="popuplink">
                  {date} at {timeFixed} till {endTimeFixed} |{' '}
                </i>

                <i className="popuplink">
                  {' '}
                  <a
                    href={'https://' + details.link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {details.link}
                  </a>
                </i>
              </div>
              <div className="secondlineMoveDown">
                <div>
                  {details.koha > 0 && details.cost > 0
                    ? `Suggested Koha :$${details.cost}`
                    : details.cost > 0
                    ? `Cost :$${details.cost}`
                    : details.koha
                    ? 'Koha '
                    : 'Free '}
                  {!details.koha &&
                  Number(details.unwagedCost) > 0 &&
                  !(Number(details.unwagedCost) >= Number(details.cost))
                    ? unwagedDisplay()
                    : ''}
                  {' | '}
                </div>
                <div>
                  {details.inperson === 'Both'
                    ? 'Online and In Person'
                    : `${details.inperson}`}
                </div>
              </div>
              <div>
                {/* This is probably not neede and will be check at input stage */}
                {details.buyTixLink !== null && details.buyTixLink !== '' && (
                  <a
                    href={'https://' + details.buyTixLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy Tickets
                  </a>
                )}
              </div>
              <PopUpImages />
              <div className="aboutsection">
                <p> {details.about}</p>
                {details.about.length > 255 && !fullScreen ? (
                  <button id="insidemorebutton" onClick={clickThrough}>
                    <i>more</i>
                  </button>
                ) : (
                  ''
                )}
              </div>
            </ul>
            <div className="sociallistcont">
              <ul className="sociallist">
                <SocialLinks link={details.facebook} name="facebook" />
                <SocialLinks link={details.instagram} name="instagram" />
                <SocialLinks link={details.twitter} name="twitter" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
