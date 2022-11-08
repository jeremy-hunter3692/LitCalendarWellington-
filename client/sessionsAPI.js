// eslint-disable-next-line no-unused-vars
import { getAllByAltText } from '@testing-library/react'
import request from 'superagent'
// eslint-disable-next-line no-unused-vars
const apiUrl = '/api/v1/sessions'

export function getLastSessionById(id) {
  return request.get(`${apiUrl}/${id}`).then((res) => {
    return res.body
  })
}

export function getSessions() {
  // console.log('sessions api')
  return request.get(apiUrl).then((res) => {
    return res.body
  })
}

export function addSessions(data) {
  //conver to utc
  console.log(data)
  const submitData = { ...data }
  console.log(submitData)
  console.log(typeof data[0].start.toUTCString(), data[0].start.toUTCString())
  console.log(typeof data[0].end.toUTCString(), data[0].end.toUTCString())
  return request
    .post(apiUrl)
    .send(submitData)
    .then((res) => {
      if (res.status === 200) {
        return res.body
      } else {
        throw new Error('post not saved')
      }
    })
    .catch((err) => {
      console.log(err.status, 'bad from addSession')
    })
}
