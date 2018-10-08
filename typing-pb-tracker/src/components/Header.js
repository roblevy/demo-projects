import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

const Header = ({ history }) => {
  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/');
  }

  return (
    <nav className='navbar' role='navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='/'>
          <div className='logo' />
        </a>
      </div>
      <div className='navbar-end'>
        {!Auth.isAuthenticated() &&
        <Link className='navbar-item' to='/register'>Register</Link>}
        {!Auth.isAuthenticated() &&
        <Link className='navbar-item' to='/login'>Login</Link>}
        <Link className='navbar-item' to='/table'>League Table</Link>
        {Auth.isAuthenticated() &&
        <Link className='navbar-item' to='/logs/new'>Log your WPM</Link>}
        {Auth.isAuthenticated() &&
        <Link className='navbar-item' to='/logs'>See your logz</Link>}
        {Auth.isAuthenticated() &&
        <a href="#" className="navbar-item standard-button" onClick={logout}>Logout {Auth.getPayload().name}</a>}
      </div>
    </nav>
  );
};

export default withRouter(Header);
