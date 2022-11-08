import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import Students from './Students.jsx'
import NotesDisplay from './NotesDisplay'

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

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<NotesDisplay />} />
        <Route
          path="/Calendar"
          element={<Students eventsData={eventsData} />}
        />
      </Routes>
    </>
  )
}

export default App
