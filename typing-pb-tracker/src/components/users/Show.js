import React from 'react';
import axios from 'axios';
import LogsIndex from '../logs/Index';

class UserShow extends React.Component {

  state = {};

  componentDidMount() {
    axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }));
  }

  render() {
    const user = this.state.user;
    return (
      <div>
        {user &&
          <div>
            <img src={user.imgUrl}></img>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            <a className='button'>New log</a>
            <LogsIndex filter={{ addedBy: user._id }}></LogsIndex>
          </div>
        }
      </div>
    );
  }
}

export default UserShow;
