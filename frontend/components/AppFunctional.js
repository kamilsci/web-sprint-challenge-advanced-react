import React, { useState } from 'react';
import axios from 'axios';

/**
 * A stateful functional component that renders a 3x3 grid of squares with
 * a movable "B" square and a keypad for moving it around.
 * The component also renders a form for submitting the email and steps count.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.className - The CSS class name for the root element.
 * @returns {JSX.Element} - The rendered component.
 */
export default function AppFunctional(props) {
  const [currentIndex, setCurrentIndex] = useState(4);
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  /**
   * Returns the coordinates of the current square.
   * The coordinates are 1-indexed, i.e. the top-left square is (1, 1) and
   * the bottom-right square is (3, 3).
   *
   * @returns {{x: number, y: number}} - The coordinates of the current square.
   */
  const getXY = () => {
    const x = Math.floor(currentIndex / 3) + 1;
    const y = (currentIndex % 3) + 1;
    return { x, y };
  };

  /**
   * Returns a string message indicating the coordinates of the current square.
   *
   * @returns {string} - The string message.
   */
  const getXYMessage = () => {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  };

  /**
   * Resets the component to its initial state.
   *
   * @returns {void}
   */
  const reset = () => {
    setCurrentIndex(4);
    setSteps(0);
    setMessage('');
    setEmail('');
  };

  /**
   * Returns the next index after moving in the specified direction.
   * The direction can be one of 'left', 'up', 'right', or 'down'.
   * The component throws an error if the direction is invalid.
   *
   * @param {string} direction - The direction to move in.
   * @returns {number} - The new index after moving in the specified direction.
   * @throws {Error} - If the direction is invalid.
   */
  const getNextIndex = (direction) => {
    // Check that the direction is a string
    if (typeof direction !== 'string') {
      throw new Error('getNextIndex: direction must be a string');
    }
    // Get the current x and y coordinates
    const { x, y } = getXY();
    let newIndex = currentIndex;
    // Determine the new index based on the direction
    switch (direction) {
      case 'left':
        // Move left
        newIndex = newIndex - 1;
        // Check if the new index is out of bounds or on the left edge
        if (newIndex < 0 || newIndex < 1) {
          setMessage("You can't go left");
          return currentIndex;
        }
        // Adjust the new index if it is on the right edge
        if (newIndex % 3 === 2) newIndex++;
        break;

      case 'up':
        // Move up
        newIndex = newIndex - 3;
        // Check if the new index is out of bounds
        if (newIndex < 0) {
          setMessage("You can't go up");
          return currentIndex;
        }
        break;

      case 'right':
        // Move right
        newIndex = newIndex + 1;
        // Check if the new index is out of bounds or on the right edge
        if (newIndex > 8 || newIndex % 3 === 0) {
          setMessage("You can't go right");
          return currentIndex;
        }
        // Adjust the new index if it is on the left edge
        if (newIndex % 3 === 0) newIndex--;
        break;

      case 'down':
        // Move down
        newIndex = newIndex + 3;

        // Check if the new index is out of bounds
        if (newIndex > 8) {
          setMessage("You can't go down");
          return currentIndex;
        }
        break;
      default:
        // Throw an error for unknown directions
        throw new Error(`getNextIndex: unknown direction '${direction}'`);
    }

    // Return the new index
    return newIndex;
  };

  /**
   * Moves the current index in the specified direction and updates the steps counter.
   *
   * @param {string} direction - The direction to move in.
   * @returns {void}
   * @throws {Error} - If the direction is invalid.
   */
  const move = (direction) => {
    // Get the new index after moving in the specified direction
    const newIndex = getNextIndex(direction);

    // Update the current index and steps counter
    setCurrentIndex(newIndex);
    setSteps((prevSteps) => prevSteps + 1);
  };

  /**
   * Handles the change event for the email input field.
   * Updates the email state with the new value.
   *
   * @param {Event} evt - The change event.
   * @returns {void}
   */
  const onChange = (evt) => {
    // Get the name and value of the input field that triggered the change event
    const { name, value } = evt.target;

    // Check if the input field is for the email
    if (name === 'email') {
      // Update the email state with the new value
      setEmail(value);
    }
  };

  /**
   * Handles the form submission event.
   * Sends a POST request to the server with the form data.
   * Updates the message state based on the response.
   *
   * @param {Event} evt - The form submission event.
   * @returns {Promise<void>} - A promise that resolves when the submission is complete.
   */

  function onSubmit(evt) {
    evt.preventDefault(); // Prevents the default form submit behavior
    const { x, y } = getXY(evt);

    axios.post('http://localhost:9000/api/result', { x, y, steps, email })
      .then(response => setMessage(response.data.message)) // Handle successful response
      .catch(error => { // Handle error response
        const errorMsg = error.response ? error.response.data.message : 'Ouch: email is required';
        setMessage(errorMsg);
      });
  }



  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {[...Array(9)].map((_, idx) => (
          <div
            key={idx}
            className={`square${idx === currentIndex ? ' active' : ''}`}
          >
            {idx === currentIndex ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>
          LEFT
        </button>
        <button id="up" onClick={() => move('up')}>
          UP
        </button>
        <button id="right" onClick={() => move('right')}>
          RIGHT
        </button>
        <button id="down" onClick={() => move('down')}>
          DOWN
        </button>
        <button id="reset" onClick={reset}> reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          name="email"
          value={email}
          onChange={onChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
