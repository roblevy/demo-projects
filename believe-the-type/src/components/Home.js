import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RacesShow from './races/RacesShow';

class Home extends React.Component {
  state = {}

  componentDidMount() {
    axios.get('/api/races')
      .then(res => this.setState({ races: res.data }));
  }
  render() {
    return (
      <div>
        {this.state.races &&
          this.state.races.map(race =>
            <Link to={`/races/${race._id}`} key={race._id}>{race._id}</Link>
          )
        }
      </div>
    );
  }
}

export default Home;
