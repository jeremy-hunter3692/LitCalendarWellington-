import React, { useState } from 'react'
import AddText from './AddText'
import CanvasDraw from 'react-canvas-draw'
import { CirclePicker } from 'react-color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [color, setColor] = useState('blue')
  const changeColor = (e) => {
    setColor(e.hex)
  }

  const [title, setTitle] = useState('title')

  function addText(text) {
    setTitle(text)
  }

  const eraseColor = () => {
    setColor('#ffffff')
  }

  let paletteColors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ]

  let saveableCanvas

  return (
    <>
      <h1>Testing!</h1>
      <div className="titleContainer">
        <AddText addText={addText} title={title} />
      </div>
      <div className="canvasContainer">
        <CanvasDraw
          brushColor={color}
          canvasWidth={800}
          canvasHeight={600}
          hideGridX={true}
          hideGridY={true}
          ref={(canvasDraw) => (saveableCanvas = canvasDraw)}
        />
      </div>
      <div className="palette">
        <h3>Palette</h3>
        <CirclePicker onChange={changeColor} colors={paletteColors} />
        <FontAwesomeIcon
          className="icon"
          icon={faEraser}
          onClick={eraseColor}
        />
      </div>
      <button
        onClick={() => {
          saveableCanvas.eraseAll()
        }}
      >
        Erase All
      </button>
    </>
  )
}
//style={{'background: transparent none repeat scroll 0% 0%; height: 100%; width: 100%; cursor: pointer; position: relative; outline: currentcolor none medium; border-radius: 50%; box-shadow: rgb(244, 67, 54) 0px 0px 0px 15px inset; transition: box-shadow 100ms ease 0s;'}})

export default App
