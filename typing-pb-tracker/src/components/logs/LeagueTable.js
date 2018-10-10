import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import LogsTable from './Table';

class LogsIndex extends React.Component {

  state = {};

  componentDidMount() {
    axios
      .get('/api/logs/best')
      .then(res => this.setState({ pbs: res.data }));
  }

  render() {
    return (
      <section className="section">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Average WPM</th>
              <th>Personal best WPM</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pbs && this.state.pbs.map(pb =>
              <tr key={pb._id}>
                <td>{pb.user[0].name}</td>
                <td>{pb.user[0].email}</td>
                <td>{pb.average}</td>
                <td>{pb.best}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }
}

export default LogsIndex;
