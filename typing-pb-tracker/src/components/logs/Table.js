import React from 'react';
import LogsTableRow from './TableRow';

const LogsTable = ({ logs }) => {
  return (
    <table className="log-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>WPM</th>
        </tr>
      </thead>
      <tbody>
        {logs &&
          logs.map(log =>
            <LogsTableRow
              log={log} key={log._id}
              handleDelete={() => this.handleDelete(log._id)}
            />
          )
        }
      </tbody>
    </table>
  );
}

export default LogsTable;
