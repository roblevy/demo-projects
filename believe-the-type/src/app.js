import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import RacesShow from './components/races/RacesShow';
import Home from './components/Home';

class App extends React.Component {
  render() {
    return (
      <div className="fullscreen" onClick={this.focusTextInput}>
        <h1>Believe the type!</h1>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/races/:id" component={RacesShow} />
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <App/>
  </Router>, document.getElementById('root'));
