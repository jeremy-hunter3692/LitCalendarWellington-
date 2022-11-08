import React from 'react'

import { Link } from 'react-router-dom'

export default function navBar() {
  return (
    <>
      <div className="nav">
        <header>
          <h1>Personal Project: two boxes</h1>
          <Link to="/">Home</Link>
          <Link to="/calendar">Calendar</Link>
        </header>
      </div>
    </>
  )
}
