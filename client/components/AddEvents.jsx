import React, { useState } from 'react'
import Popup from './PopupEvent'
import NotesForMod from './NotesForMod'
import DropDowns from './DropDowns'
import RadioButtons from './RadioButtons'
import FromReturn from './FormReturn'

const eventType = [
  'Book Launch',
  'Author Talk',
  'Reading',
  'Book Club',
  'Other',
]
const yearNow = new Date().getFullYear()

const initDetails = {
  month: 'January',
  date: '1',
  hour: '0',
  year: yearNow,
  start: new Date(yearNow, '01', '00', '00'),
  end: new Date(yearNow, '01', '01', '00'),
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
  unwagedCost: '',
  // weekly: 0,
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

const daysInMonth = (month) => new Date(2023, month, 0).getDate()

const daysEachMonth = months.map((x, idx) => daysInMonth(idx + 1))

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

function recurringEvent(firstEvent, length) {
  // make variable for weekly or monthly
  // if weekly 7 else monthtly get getMonth = 1 ??

  const daysAdded = length
  console.log('req top', firstEvent)
  const weeklyEvents = [firstEvent]
  for (let i = 1; i < length; i++) {
    let newDate = {
      ...firstEvent,
      //copying last loops datetime
      start: new Date(weeklyEvents[i - 1].start.valueOf()),
      end: new Date(weeklyEvents[i - 1].end.valueOf()),
    }
    //adding the 7 days to the last weeks datetime
    newDate.start.setDate(newDate.start.getDate() + daysAdded)
    newDate.end.setDate(newDate.end.getDate() + daysAdded)
    //push to returning array
    weeklyEvents.push(newDate)
  }
  console.log('recurring', weeklyEvents)
  // return weeklyEvents
}
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
export default function AddEvent({
  eventsSetter,
  showAddEventSetter,
  details,
}) {
  const [form, setForm] = useState(details || initDetails)
  const [disabled, setDisabled] = useState(true)
  // console.log(form)
  const editDetails = details ? details.modNotes : null

  function modNotesFromSetter(input) {
    setForm({ ...form, modNotes: input })
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
    // let arrayed = Object.keys(input[0])
    // arrayed.map((x) => {
    //   if (toBeDeleted.includes(x)) {
    //     delete input[0][x]
    //   }
    // })
    //double check could make a bug? Maybe add to handle change for preivew purposes
    form.koha ? (input[0].buyTixLink = null) : ''
    //back up for event-type maybe unnessecary
    form.typeother !== '' ? (input[0].type = input[0].typeother) : ''
    eventsSetter(input)
    showAddEventSetter()
    //Todo finsh this below returns an array of events. Figure out how we will save this.
    // recurringEvent(input[0], form.weekly)
  }

  //TO DO: //////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\
 // re write formname props as label and object key not worth trying ot make them the same thing
 
  //--------
  //reoccuring event? i.e. book club - get from other calendar repo
  //--------
  // put in stream link in location here if online?
  ///-------
  //checking for white space + required froms etc?
  //Uploading image to some where/storage generally
  //Full css work for the pop up
  //--------
  //------
  //replicate event could be edit + save as new
  //------
  //make check if it's a link or not function and implemnet in appropriate places
  //-------
  // pass down state to notes for mods to add to  'global' state.-----working with use state and passed down setter - revisit this
  //--------
  //make check if it's a link or not function and implemnet in appropriate places
  //save regular organiser/submitters ?
  //save new ?
  //some way to differentiate
  // stretch: turn off earlier options for end time setting
  //stop social media favicons changing size: set max size? - works great with non link displaying so maybe fine

  //////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\\\//////////////////\\
  const dropDownMenus = [
    { label: 'Month:', data: months, name: 'month' },
    { label: 'Date:', data: getDaysOfSelectedMonth(form.month), name: 'date' },
    { label: 'Hour:', data: hours, name: 'hour' },
    { label: 'Minutes:', data: minutes, name: 'minutes' },
    { label: 'Till', data: hours, name: 'endHours' },
    { label: 'EndMins', data: minutes, name: 'endMinutes' },
  ]

  return (
    <div className="AddEventContainer">
      <div className="addEvent">
        <form>
          <DropDowns
            form={form}
            formSet={handleChange}
            dropData={dropDownMenus}
          />
          {timeCheck()}
          {/* Reccuring event?
          <label htmlFor="weekly">How many weeks?</label>
          <input
            name="weekly"
            id="weekly"
            onChange={handleChange}
            value={form.weekly}
          /> */}
          <hr />
          <FromReturn
            formSet={handleChange}
            form={form}
            formNames={{ Title: '', Location: '', Link: '' }}
          />
          <DropDowns
            form={form}
            formSet={handleChange}
            dropData={[{ name: 'type', data: eventType, label: 'Type: ' }]}
          />
          {form.type === 'Other' && (
            <>
              <label htmlFor="typeother">Other:</label>
              <input
                autoFocus
                name="typeother"
                id="typetother"
                onChange={handleChange}
                value={form.typeother}
                placeholder="other event type here"
                disabled={disabled}
              />
            </>
          )}
          <hr></hr>
          <div>
            <label htmlFor="koha">Koha? </label>
            <input
              id="koha"
              type="checkbox"
              onChange={() => setForm({ ...form, koha: !form.koha })}
              checked={form?.koha}
            />
            <label htmlFor="cost">
              {form.koha ? 'Suggested Koha:' : 'Cost:'} $
            </label>
            <input
              id="cost"
              type="text"
              onChange={handleChange}
              value={form.cost}
              aria-label="cost"
              name="cost"
              placeholder="0"
            />
            Leave empty if {form.koha ? 'no suggested Koha' : 'free'}
            {!form.koha && (
              <label htmlFor="unwagedCost">
                {' '}
                Optional unwaged cost: $
                <input
                  id="unwagedCost"
                  onChange={handleChange}
                  value={form.unwagedCost}
                  name="unwagedCost"
                  placeholder="0"
                />
              </label>
            )}
          </div>
          {!form.koha && form.cost > 0 && (
            <>
              <label htmlFor="buyTixLink">Link to buy tickets</label>
              <input
                id="buyTixLink"
                onChange={handleChange}
                value={form.buyTixLink}
                name="buyTixLink"
                placeholder=""
              />{' '}
            </>
          )}
          <div>
            <RadioButtons
              radioDataObj={[
                { id: 'inperson', value: 'In Person' },
                { id: 'online/stream', value: 'On line/streamed' },
                { id: 'both', value: 'Both' },
              ]}
              form={form}
              handleChange={handleChange}
            />
          </div>
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
          <FromReturn
            formSet={handleChange}
            form={form}
            formNames={{ Facebook: '', Instagram: '', Twitter: '' }}
          />
        </form>
        <NotesForMod
          globalFromSetter={modNotesFromSetter}
          editDetails={editDetails}
        />
        <button onClick={handleSubmit} aria-label="save event">
          {' '}
          Save Event{' '}
        </button>
      </div>
      <div className="popuppreview">
        <Popup details={form} />
      </div>
    </div>
  )
}
