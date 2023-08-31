/* eslint-disable */
import React, { useState } from 'react'
import Popup from './PopupEvent'
import NotesForMod from './NotesForMod'
import Test from './TestFormReturn'
import DropDowns from './DropDowns'
import RadioButtons from './RadioButtons'

const eventType = ['Book Launch', 'Author Talk', 'Reading', 'Other']
const yearNow = new Date().getFullYear()

const initDetails = {
  month: 'January',
  date: '1',
  hour: '0',
  year: yearNow,
  start: new Date(yearNow, '01', '00', '00'),
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
  koha: false,
  buyTixLink: '',
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

//TODO: arrowise this function?
const daysInMonth = (month) => new Date(2023, month, 0).getDate()

const daysEachMonth = months.map((x, idx) => daysInMonth(idx + 1))

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
export default function AddEvent({ eventsSetter, showAddEventSetter }) {
  const [form, setForm] = useState(initDetails)
  const [disabled, setDisabled] = useState(true)
  console.log(form)

  function modNotesFromSetter(input) {
    setForm({ ...form, modNotes: input })
  }

  function getMonthIdx(month) {
    return months.findIndex((x) => x === month)
  }

  function getDaysOfSelectedMonth(month) {
    let numbers = []
    if (month) {
      const idx = getMonthIdx(month)
      numbers = Array(daysEachMonth[idx])
        .fill(0)
        .map((_, idx) => idx + 1)
    }
    return numbers
  }

  function makeDateObject({ year, month, date, hour, minutes }) {
    const deStringedMonth = getMonthIdx(month)
    return new Date(year, deStringedMonth, date, hour, minutes)
  }

  function timeCheck() {
    return form.start?.getHours() > form.end?.getHours()
      ? 'End time is before start time'
      : form.start?.getHours() === form.end?.getHours()
      ? form.start?.getMinutes() > form.end?.getMinutes()
        ? 'End time is before start time'
        : ''
      : ''
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
        setForm({
          ...form,
          modNotes: { ...form.modNotes },
          [name]: value,
        })
    }
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
    //back up for event-type maybe unnessecary
    form.typeother !== '' ? (input[0].type = input[0].typeother) : ''
    eventsSetter(input)
    showAddEventSetter()
  }

  //TO DO: //////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\
  //Map for inital time dropdowns here? Sort out/decide labels
  //------
  //Sort out links not going to typed in link - going to localhost/{link} atm
  //make check if it's a link or not function and implemnet in appropriate places
  //-------
  //splitting more forms into their own componenets
  //--------
  // pass down state to notes for mods to add to  'global' state.-----working with use state and passed down setter - revisit this
  //--------
  //make check if it's a link or not function and implemnet in appropriate places
  //--------
  //reoccuring event? i.e. book club - get from other calendar repo
  //--------
  // put in stream link in location here if online?
  ///-------
  //checking for white space + required froms etc?
  //Uploading image to some where/storage generally
  //Full css work for the pop up
  //--------
  //save regular organiser/submitters ?
  //save new ?
  //some way to differentiate
  // stretch: turn off earlier options for end time setting
  //stop social media favicons changing size: set max size? - works great with non link displaying so maybe fine
  //////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\
  return (
    <div className="AddEventContainer">
      <div>
        <form className="AddEvent">
          <div>
            <label htmlFor="month">
              Month:
              <DropDowns
                form={form}
                formSet={handleChange}
                data={months}
                name={'month'}
                label={'Month:'}
              />
            </label>
            <DropDowns
              form={form}
              formSet={handleChange}
              data={getDaysOfSelectedMonth(form.month)}
              name={'date'}
              label={'Date:'}
            />
            {/* {getDaysOfSelectedMonth(form.month)} */}
            <label htmlFor="hour">
              Start time:
              <DropDowns
                form={form}
                formSet={handleChange}
                data={hours}
                name={'hour'}
                label={'Hour:'}
              />
            </label>
            <label htmlFor="minutes">
              <DropDowns
                form={form}
                formSet={handleChange}
                data={minutes}
                name={'minutes'}
                label={'Minutes:'}
              />
            </label>
            <label htmlFor="endHours">
              Till:
              <DropDowns
                form={form}
                formSet={handleChange}
                data={hours}
                name={'endHours'}
                // label={'Minutes:'}
              />
            </label>
            <DropDowns
              form={form}
              formSet={handleChange}
              data={minutes}
              name={'endMinutes'}
              // label={'Minutes:'}
            />
            {timeCheck()}
            <hr />
          </div>
          <Test
            formSet={handleChange}
            form={form}
            formNames={{ title: '', location: '', link: '' }}
          />
          <label htmlFor="type">
            Event Type:
            <DropDowns
              form={form}
              formSet={handleChange}
              data={eventType}
              name={'type'}
            />
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
          <div>
            <label>Koha? </label>
            <input
              type="checkbox"
              onChange={() => setForm({ ...form, koha: !form.koha })}
              checked={form?.koha}
            />
            <label htmlFor="cost">
              {form.koha ? 'Suggested Koha:' : 'Cost:'} $
            </label>
            <input
              id="cost"
              onChange={handleChange}
              value={form.cost}
              name="cost"
              placeholder="0"
            />
            Leave empty if {form.koha ? 'no suggested Koha' : 'free'}
          </div>
          <label htmlFor="buyTixLink">Link to buy tickets</label>
          <input
            id="buyTixLink"
            onChange={handleChange}
            value={form.buyTixLink}
            name="buyTixLink"
            placeholder=""
          />
          {/*Radio buttons  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div>
            <RadioButtons
              id="inperson"
              value="In Person"
              form={form}
              handleChange={handleChange}
            />
            <RadioButtons
              id="online/stream"
              value="On line/streamed"
              form={form}
              handleChange={handleChange}
            />
            <RadioButtons
              id="both"
              value="Both"
              form={form}
              handleChange={handleChange}
            />
            {/* <input
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
            <label htmlFor="Both">Both</label> */}
          </div>
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
          {/* check this is working and then tidy up code + make these into an object inside it? Or not worth it for refactoring purposes? */}
          <Test
            formSet={handleChange}
            form={form}
            formNames={{ facebook: '', instagram: '', twitter: '' }}
          />
        </form>
        <NotesForMod globalFromSetter={modNotesFromSetter} />
        <button onClick={handleSubmit}>Save Event </button>
      </div>

      <Popup details={form} />
    </div>
  )
}

{
  /* <label htmlFor="title">Title:</label>
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
        /> */
}

{
  /* <label htmlFor="facebook">Facebook:</label>
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
        /> */
}

{
  /* <select
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
            </select> */
}
