// eslint-disable-next-line no-unused-vars
import request from 'superagent'
// eslint-disable-next-line no-unused-vars
const apiUrl = '/api/v1/events'

export function getEventById(id) {
  return request.get(`${apiUrl}/${id}`).then((res) => {
    return res.body
  })
}

export function getAllEvents() {
  return request.get(apiUrl).then((res) => {
    const data = res.body
    data[0].modNotes = {
      extranotes: data[0].extranotes,
      organisation: data[0].organisation,
      contact: data[0].contact,
      alternativeContact: data[0].alternativeContact,
    }

    data[0].start = new Date(data[0].start)
    data[0].end = new Date(data[0].end)
    return res.body
  })
}

export function addEvents(data) {
  //conver to utc
  const submitData = [...data]
  submitData.forEach((x) => {
    let start = new Date(x.start.toUTCString())
    let end = new Date(x.end.toUTCString())
    x.start = start
    x.end = end
  })
  // console.log('api', typeof data[0].start)
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
