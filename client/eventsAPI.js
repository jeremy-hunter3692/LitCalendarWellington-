// eslint-disable-next-line no-unused-vars
import request from 'superagent'
// eslint-disable-next-line no-unused-vars
import { deleteExtras, copyWithNewDateObj } from './javascript/functions'
const apiUrl = '/api/v1/events'

export function upDateEvent(changes) {
  const { id } = changes
  const submitData = copyWithNewDateObj([changes])
  deleteExtras(submitData[0])
  submitData.forEach((x) => {
    x.start = x.start.toUTCString()
    x.end = x.end.toUTCString()
  })
  return request
    .put(`${apiUrl}/${id}`)
    .send(submitData)
    .then((res) => {
      return res.body, id, changes
    })
}

export function getEventById(id) {
  return request.get(`${apiUrl}/${id}`).then((res) => {
    return res.body
  })
}
export function getAllEvents() {
  return request.get(apiUrl).then((res) => {
    const data = res.body
    data.forEach((x) => {
      x.modNotes = {
        extranotes: x.extranotes,
        organisation: x.organisation,
        contact: x.contact,
        alternativeContact: x.alternativeContact,
      }
      //THIS SHOULD BE ON ADD NOTE GET???
      deleteExtras(x)
      x.start = new Date(x.start)
      x.end = new Date(x.end)
    })

    return data
  })
}

export function addEvents(data) {
  // const submitData = structuredClone(data)
  const submitData = copyWithNewDateObj(data)
  submitData.forEach((x) => {
    x.start = x.start.toUTCString()
    x.end = x.end.toUTCString()
  })

  return request
    .post(apiUrl)
    .send(submitData)
    .then((res) => {
      if (res.status === 200) {
        return [res.body, submitData]
        //dunno what this else was about check up on it
      } else {
        throw new Error('post not saved')
      }
    })
    .catch((err) => {
      return err.status, 'post not saved'
    })
}

export function deleteEvent(id) {
  return request
    .del(`${apiUrl}/${id}`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.status, 'data not found'
    })
}

export function deleteEventsArray(data) {
  console.log(data)
  const idArray = data.map((x) => x.id)
  console.log(idArray)
  return request
    .post(idArray)
    .then((res) => {
      return idArray
    })
    .catch((err) => {
      return err.status, 'data not found'
    })
}
