import React from 'react';
import Moment from 'react-moment';

const LogsTableRow = ({ log }) => {
  return (
    <tr>
      <td><Moment format="DD/MM/YYYY">{log.date}</Moment></td>
      <td>{log.wpm}</td>
    </tr>
  );
};

export default LogsTableRow;
