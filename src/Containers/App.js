import React, { Component } from 'react';
import './App.css';
import Word from '../Components/Word';
import Letters from '../Components/Letters';
import Drawing from '../Components/Drawing';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "REACT",
      goodGuesses: "RE",
      badGuesses: "DUX"
    };
    this.onLetterChosen = this.onLetterChosen.bind(this);
  }

  onLetterChosen(ch) {
    if (Array.from(this.state.word).includes(ch)) {
      this.setState({
        goodGuesses: this.state.goodGuesses + ch
      });
    }
    else {
      this.setState({
        badGuesses: this.state.badGuesses + ch
      });
    }
    // if goodGuesses.length === word.length => GAME_OVER | WON
    // if badGuesses.length === MAX_GUESSES => GAME_OVER | LOST 
  }

  render() {
    return (
      <div className="App">
        <Word {...this.state} />
        <Drawing {...this.state} />
        <Letters {...this.state} onLetterChosen={this.onLetterChosen} />
      </div>
    );
  }
}

export default App;
