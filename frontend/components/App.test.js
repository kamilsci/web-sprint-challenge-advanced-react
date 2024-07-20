import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import AppFunctional from './AppFunctional'

describe('AppFunctional', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(<AppFunctional />)
  })

  test('renders a 3x3 grid', () => {
    const squares = wrapper.queryAllByText(/B/)
    expect(squares.length).toBe(9)
  })

  test('when moving left, the B moves left', () => {
    const leftButton = wrapper.getByText('Left')
    fireEvent.click(leftButton)

    const square = wrapper.getByText(/B/)
    expect(square).toHaveAttribute('data-testid', 'square-1')
  })

  test('when moving up, the B moves up', () => {
    const upButton = wrapper.getByText('Up')
    fireEvent.click(upButton)

    const square = wrapper.getByText(/B/)
    expect(square).toHaveAttribute('data-testid', 'square-3')
  })

  test('when moving right, the B moves right', () => {
    const rightButton = wrapper.getByText('Right')
    fireEvent.click(rightButton)

    const square = wrapper.getByText(/B/)
    expect(square).toHaveAttribute('data-testid', 'square-5')
  })

  test('when moving down, the B moves down', () => {
    const downButton = wrapper.getByText('Down')
    fireEvent.click(downButton)

    const square = wrapper.getByText(/B/)
    expect(square).toHaveAttribute('data-testid', 'square-7')
  })
})

