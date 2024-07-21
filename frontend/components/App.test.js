import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFunctional from './AppFunctional'; 

describe('Boundary movement tests', () => {
  beforeEach(() => {
    render(<AppFunctional />);
  });

  test('displays error message when attempting to move left past boundary', () => {
    const leftButton = screen.getByText('LEFT');
    fireEvent.click(leftButton); 
    fireEvent.click(leftButton);
    // Check for the error message
    expect(screen.getByText("You can't go left")).toBeInTheDocument();
  });

  test('displays error message when attempting to move right at the rightmost boundary', () => {
    const rightButton = screen.getByText('RIGHT');
    fireEvent.click(rightButton);
    fireEvent.click(rightButton);
    fireEvent.click(rightButton);
    expect(screen.getByText("You can't go right")).toBeInTheDocument();
  });

  test('displays error message when attempting to move up at the top boundary', () => {
    const upButton = screen.getByText('UP');
    fireEvent.click(upButton); 
    fireEvent.click(upButton);
    expect(screen.getByText("You can't go up")).toBeInTheDocument();
  });

  test('displays error message when attempting to move down at the bottom boundary', () => {
    const downButton = screen.getByText('DOWN');
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    expect(screen.getByText("You can't go down")).toBeInTheDocument();
  });
});

