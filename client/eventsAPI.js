// eslint-disable-next-line no-unused-vars
import request from 'superagent'
// eslint-disable-next-line no-unused-vars
import { deleteExtras, copyWithNewDateObj } from './javascript/functions'
const apiUrl = '/api/v1/events'

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
