import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import FromReturn from '../FormReturn.jsx'

describe('Form Return Componenet', () => {
  test('returns forms from componenet', () => {
    const { getByRole } = render(
      <FromReturn
        form={{ title: '', location: '', link: '' }}
        formNames={[
          { label: 'Title', name: 'title' },
          { label: 'Location', name: 'location' },
          { label: 'Link', name: 'link' },
        ]}
      />
    )

    const form1 = getByRole('textbox', { name: 'Title' })
    const form2 = getByRole('textbox', { name: 'Location' })
    const form3 = getByRole('textbox', { name: 'Link' })

    expect(form1).toBeInTheDocument()
    expect(form2).toBeInTheDocument()
    expect(form3).toBeInTheDocument()
  })
})
