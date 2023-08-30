import React, { useState } from 'react'
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
  // /TO DO DOUBLE check this works/resets with the close button and render
  // SET A BOOL for preview mode? Is that more effcient and/or readable
  // preview 'mode' bool would basically be styleData === init style
  const [fullScreen, setFullScreen] = useState(false)
  // console.log(details)

  function handleImages() {
    setTimeout(() => {
      const length = imageArr.length
      setImageIdx(imageIdx === length - 1 ? 0 : imageIdx + 1)
    }, 3000)
  }

  handleImages()

  function clickThrough() {
    if (style !== initStyle) {
      setStyle({
        margin: 0,
        padding: 0,
        position: 'absolute',
        width: '97vw',
        height: '97vh',
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
    details.about.length < 300 || fullScreen
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
                <strong>{details.title} </strong> | {date} | at {timeFixed} till{' '}
                {endTimeFixed}
              </li>
              <li>
                Location: {details.location} |{' '}
                {details.type === 'other' ? details.typeother : details.type}
              </li>
              <li>
                {' '}
                <a href={details.link}>Link: {details.link}</a>
              </li>
              <li>
                {details.inperson === 'Both'
                  ? 'Online and In Person'
                  : details.inperson}
              </li>
              <li>
                {details.koha > 0 && details.cost > 0
                  ? `suggest koha :$ ${details.cost}`
                  : details.cost > 0
                  ? `cost :$ ${details.cost}`
                  : details.koha
                  ? 'koha'
                  : 'free'}{' '}
              </li>
              <img
                src={imageArr[imageIdx]}
                alt="book cover"
                width="30%"
                // onMouseOver={handleImages}
              ></img>
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
