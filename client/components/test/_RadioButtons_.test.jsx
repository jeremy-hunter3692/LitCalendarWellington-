import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import RadioButtons from '../RadioButtons'
describe('returns correct radio buttons', () => {
  test('makes radio buttons', () => {
    const input = [
      { id: 'inperson', value: 'In Person' },
      { id: 'online/streamed', value: 'On line/Streamed' },
      { id: 'both', value: 'Both' },
    ]
    const form = { inperson: 'In Person' }
    const { getByLabelText } = render(
      <RadioButtons radioDataObj={input} form={form} />
    )

    const inPerson = getByLabelText('In Person')
    const online = getByLabelText('On line/Streamed')
    const both = getByLabelText('Both')
    expect(inPerson.type).toBe('radio')
    expect(online.type).toBe('radio')
    expect(both.type).toBe('radio')

    expect(inPerson.id).toBe('inperson')
    expect(online.id).toBe('online/streamed')
    expect(both.id).toBe('both')
    
    expect(inPerson.value).toBe('In Person')
    expect(online.value).toBe('On line/Streamed')
    expect(both.value).toBe('Both')
  })
})
