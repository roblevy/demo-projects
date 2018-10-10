import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import LogsTable from './Table';

class LogsIndex extends React.Component {

  state = {};

  filter = (arr) => {
    const filter = this.props.filter || {};
    for(const key in filter) {
      if(!RegExp(filter[key]).test(arr[key])) return false;
    }
    return true;
  }

  componentDidMount() {
    if (Auth.isAuthenticated()) {
      axios
        .get(`/api/users/${Auth.getPayload().sub}/logs`)
        .then(logs => this.setState({ logs: logs.data }));
    }
  }

  render() {
    return (
      <section className="section">
        <LogsTable logs={this.state.logs} />
      </section>
    );
  }
}

export default LogsIndex;
