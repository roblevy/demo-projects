import React from 'react';

const ResultSummary = ({ result }) => {
  return (
    <div className='summary-table'>
      <div className='summary-row'>
        <div>Player:</div>
        <div>{result.user.username}</div>
      </div>
      <div className='summary-row'>
        <div>WPM:</div>
        <div>{`${result.wpm.toFixed(0)}`}</div>
      </div>
      <div className='summary-row'>
        <div>Progress:</div>
        <div>{`${result.progress.toFixed(0)}`}%</div>
      </div>
    </div>
  );
};
export default ResultSummary;
