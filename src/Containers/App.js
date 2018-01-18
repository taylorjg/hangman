import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Word from '../Components/Word';
import Letters from '../Components/Letters';
import Drawing from '../Components/Drawing';
import ControlPanel from '../Components/ControlPanel';
import * as C from '../constants';
import { version } from '../../package.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: C.GAME_STATE_CHOOSING_WORD,
      outcome: C.OUTCOME_NONE,
      word: "",
      goodGuesses: "",
      badGuesses: ""
    };
    this.onLetterChosen = this.onLetterChosen.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
  }

  componentDidMount() {
    this.chooseWord();
  }

  onLetterChosen(ch) {
    if (this.state.gameState === C.GAME_STATE_GAME_OVER) {
      return;
    }
    if (this.state.word.includes(ch)) {
      const newGoodGuesses = this.state.goodGuesses + ch;
      const gameOver = newGoodGuesses.length === new Set(this.state.word).size;
      this.setState({
        goodGuesses: newGoodGuesses,
        gameState: gameOver ? C.GAME_STATE_GAME_OVER : this.state.gameState,
        outcome: gameOver ? C.OUTCOME_WON : this.state.outcome
      });
    }
    else {
      const newBadGuesses = this.state.badGuesses + ch;
      const gameOver = newBadGuesses.length === C.MAX_BAD_GUESSES;
      this.setState({
        badGuesses: newBadGuesses,
        gameState: gameOver ? C.GAME_STATE_GAME_OVER : this.state.gameState,
        outcome: gameOver ? C.OUTCOME_LOST : this.state.outcome
      });
    }
  }

  onNewGame() {
    this.setState({
      gameState: C.GAME_STATE_CHOOSING_WORD,
      outcome: C.OUTCOME_NONE,
      word: "",
      goodGuesses: "",
      badGuesses: ""
    });
    this.chooseWord();
  }

  chooseWord() {
    this.props.api.chooseWord()
      .then(({ word }) => {
        this.setState({
          gameState: C.GAME_STATE_IN_PROGRESS,
          word
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-version">version: {version}</div>
        <Word {...this.state} />
        <Drawing {...this.state} />
        <Letters {...this.state} onLetterChosen={this.onLetterChosen} />
        <ControlPanel {...this.state} onNewGame={this.onNewGame} />
      </div>
    );
  }
}

App.propTypes = {
  api: PropTypes.object.isRequired
};

export default App;
