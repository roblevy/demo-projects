import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import LogsIndex from './components/logs/Index';
import LogNew from './components/logs/New';
import UserShow from './components/users/Show';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LeagueTable from './components/logs/LeagueTable';

import 'bulma';
import './scss/style.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <main className='section'>
          <div className='container'>
            <Header />
            <section>
              <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/table" component={LeagueTable}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/logs" component={LogsIndex}/>
                <Route exact path="/logs/new" component={LogNew}/>
                <Route path="/users/:id" component={UserShow}/>
              </Switch>
            </section>
            <Footer />
          </div>
        </main>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
