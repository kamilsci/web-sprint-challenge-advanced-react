import React, { useState } from 'react';

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
    const { x, y } = getXY();
    let newIndex = currentIndex;
    switch (direction) {
      case 'left':
        if (x > 1) {
          newIndex -= 1;
        }
        break;
      case 'up':
        if (y > 1) {
          newIndex -= 3;
        }
        break;
      case 'right':
        if (x < 3) {
          newIndex += 1;
        }
        break;
      case 'down':
        if (y < 3) {
          newIndex += 3;
        }
        break;
      default:
        break;
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

  const onSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Submission successful!');
        } else {
          setMessage('Submission failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('Submission failed. Please try again.');
      });
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
        <button id="reset"></button>
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