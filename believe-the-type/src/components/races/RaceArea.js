import React from 'react';
import Attribution from './Attribution';
import ResultSummary from './ResultSummary';

const racerWidth = 50;
const racerHeight = 40;
const racerStyle = (progress) => {
  return {
    left: `calc(1% * ${progress} - ${progress} * ${racerWidth}px / 100)`,
    // calc( var(--complete) * 1% - var(--complete) * (40px/100));
    // transform: `translateX(calc(${-racerWidth}px * ${progress} / 100))`,
    width: racerWidth,
    height: '100%'
  };
};

const RaceArea = ({ wpm, results }) => {
  return (
    <div className='race-area'>
      <div className='wpm'>wpm: {wpm.toFixed(0)}</div>
      <div className='race-track'>
        {results && results.map(result => (
          <div className='race-lane' key={result._id}>
            <div className='racer-container' style={{height: racerHeight}}>
              <div className='racer' style={racerStyle(result.progress)}>
                {result.user.username}
              </div>
            </div>
            <div className='result-summary-area'>
              <ResultSummary result={result} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RaceArea;
