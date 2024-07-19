import React, { useState } from 'react';
import axios from 'axios';

export default function AppFunctional(props) {
  const [currentIndex, setCurrentIndex] = useState(4);
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const getXY = () => {
    const x = Math.floor(currentIndex / 3) + 1;
    const y = (currentIndex % 3) + 1;
    return { x, y };
  };

  const getXYMessage = () => {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  };

  const reset = () => {
    setCurrentIndex(4);
    setSteps(0);
    setMessage('');
    setEmail('');
  };

  const getNextIndex = (direction) => {
    if (typeof direction !== 'string') {
      throw new Error('getNextIndex: direction must be a string');
    }

    const { x, y } = getXY();
    let newIndex = currentIndex;
    switch (direction) {
      case 'left':
        newIndex = newIndex - 1;
        if (newIndex < 0) {
          setMessage("You can't go left");
          return currentIndex;
        }
        if (newIndex % 3 === 2) newIndex++;
        break;
      case 'up':
        newIndex = newIndex - 3;
        if (newIndex < 0) {
          setMessage("You can't go up");
          return currentIndex;
        }
        break;
      case 'right':
        newIndex = newIndex + 1;
        if (newIndex > 8) {
          setMessage("You can't go right");
          return currentIndex;
        }
        if (newIndex % 3 === 0) newIndex--;
        break;
      case 'down':
        newIndex = newIndex + 3;
        if (newIndex > 8) {
          setMessage("You can't go down");
          return currentIndex;
        }
        break;
      default:
        throw new Error(`getNextIndex: unknown direction '${direction}'`);
    }
    return newIndex;
  };


  const move = (direction) => {
    const newIndex = getNextIndex(direction);
    setCurrentIndex(newIndex);
    setSteps((prevSteps) => prevSteps + 1);
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'email') {
      setEmail(value);
    }
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = new FormData(evt.target);
      const response = await fetch('http://localhost:9000/api/result',
{
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('Submission successful!');
      } else {
        throw new Error('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Submission failed. Please try again.');
    }
  };

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