import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AppFunctional from './AppFunctional'

test('renders a 3x3 grid', () => {
  render(<AppFunctional />)

  const squares = screen.getAllByText(/B/)
  expect(squares.length).toBe(9)
})

test('when moving left, the B moves left', () => {
  render(<AppFunctional />)

  const leftButton = screen.getByText('Left')
  fireEvent.click(leftButton)

  const square = screen.getByText(/B/)
  expect(square).toHaveAttribute('data-testid', 'square-1')
})

test('when moving up, the B moves up', () => {
  render(<AppFunctional />)

  const upButton = screen.getByText('Up')
  fireEvent.click(upButton)

  const square = screen.getByText(/B/)
  expect(square).toHaveAttribute('data-testid', 'square-3')
})

test('when moving right, the B moves right', () => {
  render(<AppFunctional />)

  const rightButton = screen.getByText('Right')
  fireEvent.click(rightButton)

  const square = screen.getByText(/B/)
  expect(square).toHaveAttribute('data-testid', 'square-5')
})

test('when moving down, the B moves down', () => {
  render(<AppFunctional />)

  const downButton = screen.getByText('Down')
  fireEvent.click(downButton)

  const square = screen.getByText(/B/)
  expect(square).toHaveAttribute('data-testid', 'square-7')
})

