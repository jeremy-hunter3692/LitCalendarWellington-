import { SET_CURRENT_DATA } from '../Actions/currentFormActions'

const emptyForm = {
  date: '',
  hour: '',
  studentNotes: '',
  teacherNotes: '',
  name: '',
}

export default function currentForm(state = emptyForm, action) {
  const { type, payload } = action

  switch (type) {
    case SET_CURRENT_DATA:
      return payload
    default:
      return state
  }
}
