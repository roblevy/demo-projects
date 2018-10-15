import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import Header from './components/Header';
import RacesShow from './components/races/RacesShow';
import Home from './components/Home';
import Login from './components/auth/Login';
import auth from './lib/auth';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header handleLogout={this.handleLogout}/>
        <div className="fullscreen" onClick={this.focusTextInput}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route path="/races/:id" component={RacesShow} />
          </Switch>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <App/>
  </Router>, document.getElementById('root'));
