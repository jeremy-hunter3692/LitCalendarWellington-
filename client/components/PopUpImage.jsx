import React, { useState, useEffect } from 'react'

const imageArr = ['cover0.png', 'cover1.png', 'cover2.png']

export default function PopUpImages() {
  const [imageIdx, setImageIdx] = useState(0)
  useEffect(() => {
    const clearTimeOut = setInterval(() => {
      nextImg()
    }, 2000)
    //clear old time out from the images moving
    return () => {
      clearInterval(clearTimeOut)
    }
  }, [imageIdx])

  function arrowClick(e) {
    const length = imageArr.length - 1
    if (e.target.id === 'leftArrow') {
      setImageIdx(imageIdx === 0 ? length : (imageIdx) => imageIdx - 1)
      console.log(e.target.id, imageIdx)
    }
    if (e.target.id === 'rightArrow') {
      nextImg()
    }
  }

  function nextImg() {
    const length = imageArr.length - 1
    setImageIdx(imageIdx === length ? 0 : (imageIdx) => imageIdx + 1)
  }

  return (
    <>
      <button className="arrows" id="leftArrow" onClick={arrowClick}>
        {'<'}
      </button>
      <img
        id="popimg"
        src={imageArr[imageIdx]}
        alt="book cover"
        width="30%"
      ></img>
      <button className="arrows" id="rightArrow" onClick={arrowClick}>
        {'>'}
      </button>
    </>
  )
}
