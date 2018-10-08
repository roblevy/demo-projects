import React from 'react';
import Attribution from './Attribution';

const RaceArea = ({ wpm }) => (
  <div className='race-area'>
    <div className='wpm'>wpm: {wpm.toFixed(0)}</div>
    <Attribution />
  </div>
);
export default RaceArea;
