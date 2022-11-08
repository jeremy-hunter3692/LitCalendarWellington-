import { combineReducers } from 'redux'

import currentFormData from './currentFormData'
import lastFormData from './lastFormData'
import events from './events'
const reducers = combineReducers({
  currentFormData,
  lastFormData,
  events,
})

export default reducers
