import React from 'react';
import axios from 'axios';
import auth from '../../lib/auth';

class Login extends React.Component {
  state = {
    username: 'rob',
    password: 'pass'
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        auth.setToken(res.data.token);
        this.props.history.push('/');
      });
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input name="username" value={this.state.username} onChange={this.handleChange}/>
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <button>Submit</button>
        </form>
      </section>
    );
  }
}

export default Login;
