import React from 'react';
import Attribution from './Attribution';

const RaceArea = ({ wpm, results }) => {
  return (
    <div className='race-area'>
      <div className='wpm'>wpm: {wpm.toFixed(0)}</div>
      <Attribution />
      <div className='race-track'>
        {results && results.map(result => (
          <div
            className='racer'
            key={result._id}
            style={{
              marginLeft: `${result.progress}%`,
              height: 70
            }}>{result.user.username}</div>
        ))}
      </div>
    </div>
  );
};
export default RaceArea;
