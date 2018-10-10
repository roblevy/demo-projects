import React from 'react';
import TextArea from './TextArea';
import RaceArea from './RaceArea';
import axios from 'axios';

class RacesShow extends React.Component {

  state = {
    text: '',
    typed: '',
    status: '', // Stores 'o' for correct, 'x' for incorrect
    textInput: React.createRef(),
    errorStreakAt: 0,
    raceIsUnderway: false,
    wpm: 0,
    intervalId: null
  }

  componentDidMount() {
    const raceId = this.props.match.params.id;
    // let race;
    axios.get(`/api/races/${raceId}`)
      .then(res => this.setState({ race: res.data, text: res.data.text }));
  }

  componentWillUnmount() {
    clearInterval(this.state.gameClock);
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
      this.setState({ raceIsUnderway: false, endedAt: new Date(), typed, status });
    } else {
      this.setState({ typed, status });
    }
  }

  raceIsFinished = (status, text) => {
    return status.length === text.length && !status.includes('x');
  }

  handleKeyDown = (e) => {
    let { typed, status } = this.state;
    console.log(e.key);
    switch (e.key) {
      case 'Backspace':
        // Remove the last character
        typed = typed.slice(0, -1);
        status = status.slice(0, -1);
        this.setState({ typed, status });
        break;
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
    if (!this.state.raceIsUnderway) {
      const gameClock = setInterval(this.clockTick, 500);
      console.log('Set interval', gameClock);
      this.setState({ gameClock, startedAt: new Date(), raceIsUnderway: true });
    }
  }

  finishRace = () => {
    setTimeout(() => {
      console.log('Clearing interval', this.state.gameClock);
      clearInterval(this.state.gameClock);
    }, 5000);
    console.log('Race finished');
    this.setState({ raceIsUnderway: false });
  }

  clockTick = () => {
    if (this.state.raceIsUnderway) {
      this.calculateWpm();
    }
    this.readStatus();
    this.writeStatus();
  }

  calculateWpm = () => {
    const wordsTyped = this.state.typed.match(/\w+/g);
    const minutesElapsed = (new Date() - this.state.startedAt) / 1000 / 60;
    const wpm = (wordsTyped && wordsTyped.length > 3) ? wordsTyped.length / minutesElapsed : 0;
    this.setState({ wpm });
  }

  render() {
    return (
      <section className="rows">
        {this.state.raceIsUnderway && <input ref={this.state.textInput}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
          style={{opacity: '0', position: 'fixed'}}
        />}
        <RaceArea {...this.state} />
        <TextArea {...this.state} setLetterClass={this.setLetterClass} />
        <div style={{ width: '100%', height: 50, backgroundColor: '#ccc'}} onClick={this.startRace}>Start</div>
      </section>
    );
  }
}

export default RacesShow;
