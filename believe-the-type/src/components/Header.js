import React from 'react';
import auth from '../lib/auth';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {

  handleLogout = () => {
    console.log('Logging out...');
    auth.logout();
    this.props.history.push('/login');
  };

  render() {
    return (
      <nav>
        <Link to="/">Home</Link>
        {!auth.isLoggedIn() && <Link to="/login">Login</Link>}
        {!auth.isLoggedIn() && <Link to="/register">Register</Link>}
        {auth.isLoggedIn() && <button onClick={this.handleLogout}>Log out {auth.getPayload().username}</button>}
      </nav>
    );
  }
}

export default withRouter(Header);
