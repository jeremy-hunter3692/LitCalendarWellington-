import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import PopupEvent from './PopupEvent'
import { useSelector, useDispatch } from 'react-redux'
import { addEvents } from '../Actions/eventsActions'
import '!style-loader!css-loader!../../server/public/sass/styles.css'
// import '/public/sass/styles.css'

const localizer = momentLocalizer(moment)
const now = new Date()
const end = new Date()
let hour = end.getHours() + 4
end.setHours(hour)

export default function MyCalendar() {
  const [displayPop, setDisplayPop] = useState(false)
  const [popDetails, setPopDetails] = useState({})
  const [mousePos, setMousePos] = useState({})

  const dispatch = useDispatch()
  const eventData = useSelector((state) => state.events)
  const [events, setEvents] = useState([
    {
      title: 'Kates Kalandar',
      start: now,
      end: end,
      type: 'author talk',
      location: 'unity books',
      imageURL: 'www.whatever',
      sociallinks: {
        facebook: 'www.f',
        instagram: 'www.i',
        twitter: 'www.t',
      },
    },
    {
      title: 'Kates Kalandar',
      start: now,
      end: end,
      type: 'author talk',
      location: 'unity books',
      imageURL: 'www.whatever',
      sociallinks: {
        facebook: 'www.f',
        instagram: 'www.i',
        twitter: 'www.t',
      },
    },
  ])

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [displayPop])
  console.log(mousePos)
  // const [newEvents, setNewEvents] = useState([])

  // useEffect(() => {
  //   // console.log(eventData)
  //   eventData[0] ? setEvents(eventData) : setEvents([])
  // }, [eventData])

  //////from docs
  // function useCallback (){(event, start, end, isSelected) => ({
  //   ...(isSelected && {
  //     style: {
  //       backgroundColor: '#000',
  //     },
  //   }),
  //   ...(moment(start).hour() < 12 && {
  //     className: 'powderBlue',
  //   }),
  //   ...(event.title.includes('Meeting') && {
  //     className: 'darkGreen',
  //   }),
  // }),
  // []}

  // function EventPropGetter() {
  //   const eventPropGetter = useCallback(event, start, end, isSelected)

  // }
  //////from docs

  function handleSelect(e) {
    //Add newEvent to redux state
    console.log('handle select', e)
    setDisplayPop(true)
    setPopDetails(e)
  }

  //save on navigate away??
  function submit() {
    // dispatch(addEvents(newEvents))
  }

  function click() {
    setDisplayPop(false)
    console.log('click', displayPop)
  }
  return (
    <div>
      <button onClick={submit}>submit events</button>
      <h1>Calender</h1>

      {displayPop && (
        <PopupEvent details={popDetails} styleData={mousePos} click={click} />
      )}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        defaultView={Views.MONTH}
        // selectable={true}
        onSelectEvent={handleSelect}
        // eventPropGetter={(event, start, end, isSelected) => {className: string, style?: Object}}
        longPressThreshold={10}
      />
    </div>
  )
}
