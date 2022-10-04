// eslint-disable-next-line no-unused-vars
import { getAllByAltText } from '@testing-library/react'
import request from 'superagent'
// eslint-disable-next-line no-unused-vars
const apiUrl = '/api/v1/sessions'

export function getLastSession() {
  return request.get(apiUrl).then((res) => {
    return res.body
  })
}

export function getSessionById() {
  return request.get(apiUrl).then((res) => {
    return res.body
  })
}

export function addSession(data) {
  return request
    .post(apiUrl)
    .send(data)
    .then((res) => {
      if (res.status === 200) {
        return res.body
      } else {
        throw new Error('post not saved')
      }
    })
    .catch((err) => {
      console.error(err, 'bad from addSession')
    })
}
