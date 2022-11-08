export const SET_CURRENT_DATA = 'SET_CURRENT_DATA'

export function setTodaysFormData(data) {
  return {
    type: 'SET_CURRENT_DATA',
    payload: data,
  }
}
