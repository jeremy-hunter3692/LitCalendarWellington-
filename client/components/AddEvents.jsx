import React, { useState } from 'react'
import Popup from './PopupEvent'
import NotesForMod from './NotesForMod'
import DropDowns from './DropDowns'
import RadioButtons from './RadioButtons'
import FromReturn from './FormReturn'
import { addEvents } from '../eventsAPI'
import {
  deleteExtras,
  makeDateObject,
  getDaysOfSelectedMonth,
  copyWithNewDateObj,
} from '../javascript/functions'
import {
  initDetails,
  toBeDeleted,
  months,
  hours,
  minutes,
  eventType,
} from '../javascript/initCalendarData'

export default function AddEvent({
  eventsSetter,
  showAddEventSetter,
  editDetails,
}) {
  const [form, setForm] = useState(editDetails || initDetails)
  const [disabled, setDisabled] = useState(true)
  // console.log('top', form)
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

  function sanitizeSubmitObject(obj) {
    //TO DO check date object copying here rather than taking the date object.
    const copiedObj = copyWithNewDateObj([obj])
    const deArrayed = copiedObj[0]
    const { start, end } = deArrayed
    //fixing bug that comes from being able to preview end times
    end.setDate(start.getDate())
    end.setMonth(start.getMonth())
    form.koha ? (deArrayed.buyTixLink = null) : ''
    deleteExtras(deArrayed)
    return deArrayed
  }

  function handleSubmit(e) {
    e.preventDefault()
    //Reminder events must be an array for the calendar
    const input = sanitizeSubmitObject(form)
    eventsSetter([input])
    showAddEventSetter()
    addEvents([input])
    //Todo finsh this below returns an array of events. Figure out how we will save this.
    // recurringEvent(input[0], form.weekly)
  }

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
        {/* Remember this and try changing to it? <input type="date"></input> */}
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
            formNames={[
              { label: 'Title', name: 'title' },
              { label: 'Location', name: 'location' },
              { label: 'Link', name: 'link' },
            ]}
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
                { id: 'online/stream', value: 'On line/Streamed' },
                { id: 'both', value: 'Both' },
              ]}
              form={form}
              aria-labelledby="OnlineOrIRL"
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
          <FromReturn
            formSet={handleChange}
            form={form}
            formNames={[
              { label: 'Facebook', name: 'facebook' },
              { label: 'Instagram', name: 'instagram' },
              { label: 'Twitter', name: 'twitter' },
            ]}
          />
          <NotesForMod
            globalFromSetter={modNotesFromSetter}
            editDetails={editDetails}
          />
          <button onClick={handleSubmit} aria-label="save event">
            Save Event{' '}
          </button>
        </form>
      </div>
      <div className="popuppreview">
        <Popup details={form} />
      </div>
    </div>
  )
}
