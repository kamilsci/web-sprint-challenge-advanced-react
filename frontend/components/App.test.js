import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import AppFunctional from './AppFunctional'

describe('AppFunctional', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(<AppFunctional />)
  })

  test('when moving left, the submit button fires', () => {
    const leftButton = wrapper.getByText('Left')
    fireEvent.click(leftButton)
    const submitButton = wrapper.getByText('Submit')
    expect(submitButton).toHaveBeenCalled()
  })

  test('when moving up, the submit button fires', () => {
    const upButton = wrapper.getByText('Up')
    fireEvent.click(upButton)
    const submitButton = wrapper.getByText('Submit')
    expect(submitButton).toHaveBeenCalled()
  })

  test('when moving right, the submit button fires', () => {
    const rightButton = wrapper.getByText('Right')
    fireEvent.click(rightButton)
    const submitButton = wrapper.getByText('Submit')
    expect(submitButton).toHaveBeenCalled()
  })

  test('when moving down, the submit button fires', () => {
    const downButton = wrapper.getByText('Down')
    fireEvent.click(downButton)
    const submitButton = wrapper.getByText('Submit')
    expect(submitButton).toHaveBeenCalled()
  })
})



