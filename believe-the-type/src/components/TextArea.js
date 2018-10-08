import React from 'react';

const TextArea = ({ text, started, startedAt, setLetterClass }) => (
  <div className='text-area'>
    <p>{text.split('').map((letter, i) =>
      <span key={i} className={setLetterClass(letter, i)}>{letter}</span>
    )}</p>
    {started &&
      <div style={{ position: 'absolute' }}>
        <p>
          Race started at: {startedAt.toLocaleTimeString()}
        </p>
        <p>
          Time elapsed: {((new Date() - startedAt) / 1000).toFixed(0) + ' seconds'}
        </p>
      </div>
    }
  </div>
);
export default TextArea;
