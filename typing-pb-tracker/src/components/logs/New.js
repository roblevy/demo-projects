import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class LogNew extends React.Component {
  state = {
    user: Auth.getPayload().sub,
    date: new Date()
  };

  handleChange = (e) => {
    this.setState({ wpm: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/logs', this.state)
      .then(() => this.props.history.push('/logs'));
  }

  render() {
    return (
      <section className="section">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="wpm">WPM</label>
            <input type='number' name="wpm" value={this.state.wpm || ''}
              onChange={this.handleChange}
              placeholder='WPM, e.g. 50' className="input"/>
          </div>
          <button className="button is-info">Submit</button>
        </form>
      </section>
    );
  }
}

export default LogNew;
