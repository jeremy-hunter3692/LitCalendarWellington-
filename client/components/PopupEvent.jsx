import React, { useState, useEffect } from 'react'
import SocialLinks from './SocialLinks'

const initStyle = {
  margin: 0,
  padding: 0,
  position: 'relative',
  width: '20rem',
  height: '30rem',
  left: 50,
  top: 50,
}
const imageArr = ['cover0.png', 'cover1.png', 'cover2.png']

export default function Popup({ details, styleData, close }) {
  const [style, setStyle] = useState(styleData || initStyle)
  const [imageIdx, setImageIdx] = useState(0)
  const [fullScreen, setFullScreen] = useState(false)

  useEffect(() => {
    const timeout = handleImages()
    //clear old time out from the images moving
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  function handleImages() {
    return setTimeout(() => {
      const length = imageArr.length
      imageIdx === length - 1 ? setImageIdx(0) : setImageIdx(() => imageIdx + 1)
    }, 3000)
  }

  function clickThrough() {
    if (style !== initStyle) {
      setStyle({
        margin: 0,
        padding: 0,
        position: 'absolute',
        width: '97vw',
        height: '99vh',
        left: 2,
        top: 3,
      })
      setFullScreen(true)
    }
  }

  const date = details.start?.toDateString()
  //TO DO DOUBLECheck this doesn't mess anything up
  const time = details.start?.toLocaleTimeString('en-US') || ''
  const timeFixed = time?.slice(0, -6) + time?.slice(-2)
  const endTime = details.end?.toLocaleTimeString('en-US') || ''
  const endTimeFixed = endTime?.slice(0, -6) + endTime?.slice(-2)
  const about =
    details.about?.length < 300 || fullScreen
      ? details.about
      : details.about.slice(0, 300)

  //it's less than 300 nothing

  return (
    <>
      <div style={style}>
        <div className="popup">
          {style !== initStyle ? (
            <>
              <button onClick={close}>X</button>
              {!fullScreen && <button onClick={clickThrough}>more</button>}
            </>
          ) : (
            ' '
          )}
          <div className="licontainer">
            <ul>
              <li>
                {' '}
                <strong>{details.title} </strong> |{' '}
                {details.type === 'Other' ? details.typeother : details.type}
              </li>
              <li>
                Location: {details.location} |{' '}
                <i>
                  {date} at {timeFixed} till {endTimeFixed}
                </i>
              </li>
              <li>
                Link:{' '}
                <a
                  href={'https://' + details.link}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {details.link}
                </a>
                |{' '}
                {details.inperson === 'Both'
                  ? 'Online and In Person'
                  : details.inperson}
              </li>

              <li>
                {details.koha > 0 && details.cost > 0
                  ? `Suggested Koha :$${details.cost}`
                  : details.cost > 0
                  ? `Cost :$${details.cost}`
                  : details.koha
                  ? 'Koha'
                  : 'Free'}
                {!details.koha &&
                Number(details.unwagedCost) > 0 &&
                !(Number(details.unwagedCost) >= Number(details.cost))
                  ? `/${details.unwagedCost} waged/unwaged`
                  : ''}
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
              </li>
              <img
                id="popimg"
                src={imageArr[imageIdx]}
                alt="book cover"
                width="30%"
                // onMouseOver={handleImages}
              ></img>
              <li>
                <p>
                  {about}
                  {details.about.length > 300 && !fullScreen ? (
                    <button id="insidemorebutton" onClick={clickThrough}>
                      ...more
                    </button>
                  ) : (
                    ''
                  )}
                </p>
              </li>
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
