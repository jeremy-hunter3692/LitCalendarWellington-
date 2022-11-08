import { SET_EVENTS_DATA } from '../Actions/eventsActions.js'

const emptyForm = {}

export default function lastForm(state = emptyForm, action) {
  const { type, payload } = action

  switch (type) {
    case SET_EVENTS_DATA:
      return payload
    default:
      return state
  }
}
