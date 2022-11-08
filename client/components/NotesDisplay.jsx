import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CurrentSession from './CurrentSession'
import LastSession from './LastSession'
import { getLastSessionById } from '../sessionsAPI'
import { setLastSessionFormData } from '../Actions/lastFormActions'
import { fetchEvents } from '../Actions/eventsActions'

const eventsData = [
  {
    start: new Date(2022, 9, 6, 17, 0, 0),
    end: new Date(2022, 9, 6, 18, 0, 0),
    title: 'First event', //student.name
    studentId: 3,
  },
  {
    start: new Date(2022, 9, 6, 18, 0, 0),
    end: new Date(2022, 9, 6, 19, 0, 0),
    title: 'Second event',
    studentId: 6,
  },
  {
    start: new Date(2022, 9, 6, 8, 0, 0),
    end: new Date(2022, 9, 6, 5, 0, 0),
    title: 'Third event',
    studentId: 8,
  },
]
//Only working by hours. need check for day
const now = new Date().getHours()

export default function NotesDisplay() {
  const dispatch = useDispatch()
  const [displayCurrent, setDisplayCurrent] = useState(false)

  //loading last session from the data base via apli client and then setting it in the state
  useEffect(() => {
    dispatch(fetchEvents())
    //reduxing

    // dispatch()
    //if current time is equally to a time in the eventsData array
    //get the id of the student who is attached to that event
    //get the last session where the id matches from the database
    //set in state

    let result = eventsData.find((x) => {
      if (x.start.getHours() >= now && x.start.getHours() < now + 1) {
        return x
      }
    })

    result
      ? getLastSessionById(result.studentId)
          .then((data) => {
            dispatch(setLastSessionFormData(data))
          })
          .catch((err) => {
            console.error(err.message)
          })
      : console.log('not loaded: sessions')
  }, [])

  return (
    <>
      <button
        className="clickMe"
        onClick={(e) => {
          e.preventDefault()
          setDisplayCurrent(!displayCurrent)
        }}
      >
        {!displayCurrent ? 'Show Current Session' : 'Show Last Session'}
      </button>
      {displayCurrent ? <CurrentSession /> : <LastSession />}
    </>
  )
}
