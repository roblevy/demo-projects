import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './scss/style.scss';
import TextArea from './components/TextArea';
import RaceArea from './components/RaceArea';
import axios from 'axios';

class App extends React.Component {

  state = {
    text: '',
    typed: '',
    status: '', // Stores 'o' for correct, 'x' for incorrect
    textInput: React.createRef(),
    errorStreakAt: 0,
    started: false,
    wpm: 0,
    intervalId: null
  }

  componentDidMount() {
    const raceId = this.props.match.params.id;
    // let race;
    axios.get(`/api/races/${raceId}`)
      .then(res => this.setState({ race: res.data, text: res.data.text }));
    this.setState({ readIntervalId: setInterval(this.readStatus, 1000) });
    this.setState({ writeIntervalId: setInterval(this.writeStatus, 1000) });
  }

  readStatus = () => {
    const raceId = this.props.match.params.id;
    axios.get(`/api/races/${raceId}/results`)
      .then(res => this.setState({ results: res.data }));
  }

  writeStatus = () => {
    const { race, wpm, status, text } = this.state;
    if (race) {
      console.log('writing status');
      axios.post(`/api/races/${race._id}/results`, {
        complete: status ? this.raceIsFinished(status, text) : false,
        race: race._id,
        user: '5bb777fd8da008a7b72ac190',
        wpm: wpm,
        progress: status ? status.length / text.length * 100 : 0
      });
    }
  }

  componentDidUpdate() {
    this.focusTextInput();
  }

  handleKeyPress = (e) => {
    let { typed, status } = this.state;
    const { text } = this.state;
    if (typed.length < text.length) {
      typed += e.key;
      status += this.status(status, typed, text);
    }
    if (this.raceIsFinished(status, text)) {
      this.finishRace();
      this.setState({ started: false, endedAt: new Date(), typed, status });
    } else {
      this.setState({ typed, status });
    }
  }

  raceIsFinished = (status, text) => {
    return status.length === text.length && !status.includes('x');
  }

  handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      let { typed, status } = this.state;
      // Remove the last character
      typed = typed.slice(0, -1);
      status = status.slice(0, -1);
      this.setState({ typed, status });
    }
  }

  focusTextInput = () => {
    // Make sure keystrokes get sent to the text input
    if (this.state.textInput.current) {
      this.state.textInput.current.focus();
    }
  }

  setLetterClass = (letter, position) => {
    if (this.state.status.length < (position + 1)) {
      // User hasn't typed this far yet
      return 'text';
    }
    // Is the letter typed correctly or not? Check the status string
    return this.state.status[position] === 'o' ? 'text correct' : 'text incorrect';
  }

  status = (status, typed, text) => {
    // Once an error has been made, it's all errors from here on in!
    if (status.includes('x')) {
      return 'x';
    }
    // Compare the last letter of typed with the current letter of text
    // 'o' is correct, 'x' is incorrect
    return (typed.slice(-1) === text[typed.length - 1] ? 'o' : 'x');
  }

  startRace = () => {
    const timer = setInterval(this.calculateWpm, 500);
    this.setState({ timer, startedAt: new Date(), started: true });
  }

  finishRace = () => {
    clearInterval(this.state.timer);
    setTimeout(() => alert('Finished!'), 50);
  }

  calculateWpm = () => {
    const wordsTyped = this.state.typed.match(/\w+/g);
    const minutesElapsed = (new Date() - this.state.startedAt) / 1000 / 60;
    const wpm = (wordsTyped && wordsTyped.length > 3) ? wordsTyped.length / minutesElapsed : 0;
    this.setState({ wpm });
  }

  render() {
    return (
      <div className='fullscreen' onClick={this.focusTextInput}>
        <h1>Believe the type!</h1>
        {this.state.started && <input ref={this.state.textInput}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
          style={{opacity: '0', position: 'fixed'}}
        />}
        <RaceArea {...this.state} />
        <TextArea {...this.state} setLetterClass={this.setLetterClass} />
        <div style={{ width: '100%', height: 50, backgroundColor: '#ccc'}} onClick={this.startRace}>Start</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <Route path="/race/:id" component={App}/>
  </Router>, document.getElementById('root'));
