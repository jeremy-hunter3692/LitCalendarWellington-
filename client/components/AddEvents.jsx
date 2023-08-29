/* eslint-disable */
import React, { useState } from 'react'
import Popup from './PopupEvent'
import NotesForMod from './NotesForMod'

const eventType = ['Book Launch', 'Author Talk', 'Other']

const initDetails = {
  month: 'January',
  date: '1',
  hour: '0',
  year: new Date().getFullYear(),
  minutes: '0',
  endHours: '0',
  endMinutes: '0',
  title: '',
  type: 'Book Launch',
  link: '',
  location: '',
  imageURL: '',
  about: '',
  facebook: '',
  instagram: '',
  twitter: '',
  typeother: '',
  inperson: 'In Person',
  cost: '',
  modNotes: {},
  koha: null,
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
//Add typeOther?
const toBeDeleted = [
  'year',
  'date',
  'month',
  'hour',
  'minutes',
  'endMinutes',
  'endHours',
]

const hours = Array(24)
  .fill(0)
  .map((_, idx) => idx)

const minutes = Array(12)
  .fill(0)
  .map((_, idx) => idx * 5)

function daysInMonth(month) {
  return new Date(2023, month, 0).getDate()
}

const daysEachMonth = months.map((x, idx) => daysInMonth(idx + 1))

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
export default function AddEvent({ eventsSetter, showAddEventSetter }) {
  const [form, setForm] = useState(initDetails)
  const [disabled, setDisabled] = useState(true)
  const [badTime, setBadTime] = useState(false)
  const [checked, setChecked] = useState(false)
  // console.log(form)

  const handleCheck = () => {
    setChecked(!checked)
  }

  function globalFromSetter(input) {
    setForm({ ...form, modNotes: input })
  }
  function getMonthIdx(month) {
    return months.findIndex((x) => x === month)
  }

  function makeDateObject({ year, month, date, hour, minutes }) {
    const deStringedMonth = getMonthIdx(month)
    return new Date(year, deStringedMonth, date, hour, minutes)
  }

  function handleChange(e) {
    const { name, value } = e.target
    let tempObj = {}

    switch (true) {
      case value === 'Other':
        setDisabled(false)
        setForm({ ...form, modNotes: { ...form.modNotes }, [name]: value })
        break
      case name === 'type' && value !== 'Other':
        setDisabled(true)
        setForm({
          ...form,
          modNotes: { ...form.modNotes },
          [name]: value,
          typeother: '',
        })
        break
      case name === 'endHours':
        tempObj = makeDateObject({
          ...form,
          hour: value,
          minutes: form.endMinutes,
        })

        setForm({
          ...form,
          modNotes: { ...form.modNotes },
          [name]: value,
          end: tempObj,
        })
        break
      case name === 'endMinutes':
        tempObj = makeDateObject({
          ...form,
          hour: form.endHours,
          minutes: value,
        })
        setForm({
          ...form,
          modNotes: { ...form.modNotes },
          [name]: value,
          end: tempObj,
        })
        break
      case toBeDeleted.includes(name):
        tempObj = makeDateObject({ ...form, [name]: value })
        setForm({
          ...form,
          modNotes: { ...form.modNotes },
          [name]: value,
          start: tempObj,
        })
        break
      default:
        setForm({ ...form, modNotes: { ...form.modNotes }, [name]: value })
    }
    //better place to do this so less errors
    //and on update
    if (form.start !== undefined) {
      form.start.getHours() > form.end.getHours()
        ? setBadTime(true)
        : setBadTime(false)
    }

    // if (value === 'other') {
    //   setDisabled(false)
    // }
    // if (name === 'type' && value !== 'other') {
    //   setDisabled(true)
    //   setForm({ ...form, [name]: value, typeother: '' })
    // } else {
    //   //TODO REFACTOR? - this is to update the time imeditaly with preivew
    //   let tempObj = makeDateObject({ ...form, [name]: value })
    //   setForm({ ...form, [name]: value, start: tempObj })
    //  ///end stufff
    // let result = makeDateObject({
    //   ...form,
    //   hour: form.end,
    //   minutes: form.endMinutes,
    // })
    // }
  }

  function handleSubmit(e) {
    e.preventDefault()
    //Reminder events must be an array for the calendar
    let input = [{ ...form }]
    let arrayed = Object.keys(input[0])
    arrayed.map((x) => {
      if (toBeDeleted.includes(x)) {
        delete input[0][x]
      }
    })
    //TO DO Check this
    form.typeother !== '' ? (input[0].type = input[0].typeother) : ''
    input[0].koha = checked
    //TO DO /\/\/\/\
    // input=[{...form, notesformod: {childFrom} }] could be up the top there on first input
    /////////////////
    eventsSetter(input)
    showAddEventSetter()
  }

  function getDaysOfSelectedMonth(month) {
    let numbers = []
    if (month) {
      const idx = getMonthIdx(month)
      numbers = Array(daysEachMonth[idx])
        .fill(0)
        .map((_, idx) => idx + 1)
    }
    return (
      <label htmlFor="date">
        Date:
        <select
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        >
          <option value="Date:" disabled>
            Date:
          </option>
          {numbers.map((x) => (
            <option key={x} value={x} title={x}>
              {x}
            </option>
          ))}
        </select>
      </label>
    )
  }

  //TO DO: //////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\

  // pass down state to notes for mods to add to  'global' state.
  //working with use state and passed down setter - revisit this

  //reoccuring event? i.e. book club - get from other calendar repo
  // put in stream link in location here if online?
  //checking for white space + required froms etc
  //Uploading image to some where/storage generally
  //multiple images in preview?
  //Full css work for the pop up
  //save regular organiser/submitters ?
  //save new ?
  //some way to differentiate
  // stretch: turn off earlier options for end time setting
  //stop social media favicons changing size: set max size? - works great with non link displaying so maybe fine
  //////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\
  return (
    <div>
      <form className="AddEvent">
        <div>
          <label htmlFor="month">
            Month:
            <select
              id="month"
              name="month"
              value={form.month}
              onChange={handleChange}
              required
            >
              <option value="Month:" disabled>
                Month:
              </option>
              {months.map((x) => (
                <option key={x} value={x} title={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>
          {getDaysOfSelectedMonth(form.month)}
          <label htmlFor="hour">
            Hour:
            <select
              id="hour"
              name="hour"
              value={form.hour}
              onChange={handleChange}
              required
            >
              <option value="Hour:" disabled>
                Hour:
              </option>
              {hours.map((x) => (
                <option key={x} value={x} title={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="minutes">
            Minutes:
            <select
              id="minutes"
              name="minutes"
              value={form.minutes}
              onChange={handleChange}
              required
            >
              <option value="Minutes:" disabled>
                Minutes:
              </option>
              {minutes.map((x) => (
                <option key={x} value={x} title={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="endHours">
            Till:
            <select
              id="endHours"
              name="endHours"
              value={form.endHours}
              onChange={handleChange}
              required
            >
              <option value="Length:" disabled>
                Hours
              </option>
              {hours.map((x) => (
                <option key={x} value={x} title={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>

          <select
            id="endMinutes"
            name="endMinutes"
            value={form.endMinutes}
            onChange={handleChange}
            required
          >
            <option value="minutes:" disabled>
              Minutes:
            </option>
            {minutes.map((x) => (
              <option key={x} value={x} title={x}>
                {x}
              </option>
            ))}
          </select>
          {badTime ? 'End time is before start time' : ''}
          <hr />
        </div>
        Other Details///
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          onChange={handleChange}
          value={form.title}
          name="title"
          required
          placeholder="Title"
        />
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          onChange={handleChange}
          value={form.location}
          name="location"
          required
          placeholder="Location"
        />
        <label htmlFor="link">Link:</label>
        <input
          id="link"
          onChange={handleChange}
          value={form.link}
          name="link"
          placeholder="link"
        />
        <label htmlFor="type">
          Event Type:
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="Choose type" disabled>
              Choose type
            </option>
            {eventType.map((x) => (
              <option key={x} value={x} title={x}>
                {x}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="typeother">Other:</label>
        <input
          id="typetother"
          onChange={handleChange}
          value={form.typeother}
          name="typeother"
          placeholder="other event type here"
          disabled={disabled}
        />
        <hr></hr>
        <label htmlFor="cost">{checked ? 'Suggested Koha' : 'Cost: $'}</label>
        <input
          id="cost"
          onChange={handleChange}
          value={form.cost}
          name="cost"
          placeholder="0"
        />
        <div>
          <label>
            <input type="checkbox" onChange={handleCheck} checked={checked} />
            Koha?
          </label>
        </div>
        {/*Radio buttons  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <input
          type="radio"
          name="inperson"
          value="In Person"
          id="inperson"
          checked={form.inperson === 'In Person'}
          onChange={handleChange}
        />
        <label htmlFor="inperson">In person</label>
        <input
          type="radio"
          name="inperson"
          value="On line/streamed"
          id="online/streamed"
          checked={form.inperson === 'On line/streamed'}
          onChange={handleChange}
        />
        <label htmlFor="online/streamed">online/streamed</label>
        <input
          type="radio"
          name="inperson"
          value="Both"
          id="Both"
          checked={form.inperson === 'Both'}
          onChange={handleChange}
        />
        <label htmlFor="Both">Both</label>
        {/* End Radio  */}
        <div className="textarea">
          <div>
            <label htmlFor="about">About:</label>
          </div>
          <textarea
            id="about"
            onChange={handleChange}
            value={form.about}
            name="about"
            required
            placeholder="this text will be cut off at 300 characters in the pop up"
          />
        </div>
        <hr></hr>
        <h4>Social links:</h4>
        <label htmlFor="facebook">Facebook:</label>
        <input
          id="facebook"
          onChange={handleChange}
          value={form.facebook}
          name="facebook"
          placeholder="facebook"
        />
        <label htmlFor="instagram">Instagram:</label>
        <input
          id="instagram"
          onChange={handleChange}
          value={form.instagram}
          name="instagram"
          placeholder="Instagram"
        />
        <label htmlFor="twitter">Twitter:</label>
        <input
          id="twitter"
          onChange={handleChange}
          value={form.twitter}
          name="twitter"
          placeholder="twitter"
        />
        <button onClick={handleSubmit}>Save Event </button>
      </form>
      <NotesForMod globalFromSetter={globalFromSetter} />
      <Popup details={form} />
    </div>
  )
}
