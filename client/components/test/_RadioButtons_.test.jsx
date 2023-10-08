import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import RadioButtons from '../RadioButtons'
//TO DOO FIGURE OUT NAMING OF ARIA BUTTONS AND WHY RADIO2 BREAKS THE TEST
describe('returns correct radio buttons', () => {
  test('makes radio buttons', () => {
    const input = [
      { id: 'inperson', value: 'In Person' },
      { id: 'online/stream', value: 'On line/Streamed' },
      { id: 'both', value: 'Both' },
    ]
    const form = { inperson: '' }
    const { getByRole } = render(
      <RadioButtons radioDataObj={input} form={form} />
    )
    const radio1 = getByRole('radio', { name: 'In Person' })
    const radio2 = getByRole('radio', { name: 'On line/streamed' })
    const radio3 = getByRole('radio', { name: 'Both' })

    expect(radio1).toBeInTheDocument()
    expect(radio2).toBeInTheDocument()
    expect(radio3).toBeInTheDocument()
  })

  // test('makes radio buttons', () => {
  //   const input = [{ id: 'inperson', value: 'In Person' }]
  //   const form = { inperson: '' }
  //   const { getByRole } = render(
  //     <RadioButtons radioDataObj={input} form={form} />
  //   )
  //   const button = getByRole('radio')

  //   expect(button).toBeInTheDocument()
  // })
})
