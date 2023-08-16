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
const practiseData = [
  {
    title: 'Kates Kalandar',
    start: now,
    end: end,
    type: 'author talk',
    location: 'unity books',
    imageURL: 'www.whatever',
    about:
      'blah blah blah blah blah ablha baluhablah ablhab lahb ablbablahblab albhalbalh a balh bab ahb lahb al hbal hbalb alhb a hbal balhb alhb ahlb ',

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
    about:
      'blah blah blah blah blah ablha baluhablah ablhab lahb ablbablahblab albhalbalh a balh bab ahb lahb al hbal hbalb alhb a hbal balhb alhb ahlb ',

    sociallinks: {
      facebook: 'www.f',
      instagram: 'www.i',
      twitter: 'www.t',
    },
  },
  {
    title: 'Title',
    start: new Date(2022, 10, 7, 12),
    end: new Date(2022, 10, 7, 13),
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
    title: 'Title2',
    start: new Date(2022, 10, 11, 12),
    end: new Date(2022, 10, 11, 13),
    type: 'author talk',
    location: 'unity books',
    imageURL: 'www.whatever',
    about:
      'blah blah blah blah blah ablha baluhablah ablhab lahb ablbablahblab albhalbalh a balh bab ahb lahb al hbal hbalb alhb a hbal balhb alhb ahlb ',
    sociallinks: {
      facebook: 'www.f',
      instagram: 'www.i',
      twitter: 'www.t',
    },
  },
  {
    title: 'Title3',
    start: new Date(2022, 10, 12, 12),
    end: new Date(2022, 10, 12, 13),
    type: 'author talk',
    location: 'unity books',
    imageURL: 'www.whatever',
    about:
      'blah blah blah blah blah ablha baluhablah ablhab lahb ablbablahblab albhalbalh a balh bab ahb lahb al hbal hbalb alhb a hbal balhb alhb ahlb ',
    sociallinks: {
      facebook: 'www.f',
      instagram: 'www.i',
      twitter: 'www.t',
    },
  },
  {
    title: 'Title4',
    start: new Date(2022, 10, 29, 12),
    end: new Date(2022, 10, 29, 13),
    type: 'author talk',
    location: 'unity books',
    imageURL: 'www.whatever',
    about:
      'blah blah blah blah blah ablha baluhablah ablhab lahb ablbablahblab albhalbalh a balh bab ahb lahb al hbal hbalb alhb a hbal balhb alhb ahlb ',
    sociallinks: {
      facebook: 'www.f',
      instagram: 'www.i',
      twitter: 'www.t',
    },
  },
]

export default function MyCalendar({ eventsProps }) {
  const [displayPop, setDisplayPop] = useState(false)
  const [popDetails, setPopDetails] = useState({})
  // const [mousePos, setMousePos] = useState({})

  const dispatch = useDispatch()
  const eventData = useSelector((state) => state.events)
  // console.log('calendar init', eventsProps)
  // const [events, setEvents] = useState(eventsProps)

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     setMousePos({ x: event.clientX, y: event.clientY })
  //   }

  //   window.addEventListener('mousemove', handleMouseMove)

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove)
  //   }
  // }, [displayPop])
  // console.log(mousePos)

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
      {/* <button onClick={submit}>submit events</button> */}
      <h1>Calender</h1>

      {displayPop && (
        <PopupEvent details={popDetails} styleData={mousePos} click={click} />
      )}

      <Calendar
        localizer={localizer}
        events={eventsProps}
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
