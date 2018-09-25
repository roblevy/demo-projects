import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import LogsTable from './logs/Table';

class Home extends React.Component {

  state = {}

  componentDidMount() {
    if(Auth.isAuthenticated()) {
      axios.get(`/api/users/${Auth.getPayload().sub}/logs/3`)
        .then(res => this.setState({ logs: res.data }));
    }
  }

  render() {
    return (
      <div>
        <section className="section">
          <h1 className="title is-2">Welcome to LOGZ</h1>
          <h2 className="subtitle is-4">Where you log your daily words per minute</h2>
        </section>
        {Auth.isAuthenticated() &&
        <section className="section">
          <hr/>
          <h3 className="subtitle is-3">Your three most recent logs:</h3>
          {this.state.logs && <LogsTable logs={this.state.logs} />}
        </section>
        }
      </div>
    );
  }
}

export default Home;
