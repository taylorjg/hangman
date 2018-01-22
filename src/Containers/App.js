import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Gallows from '../Components/Gallows';
import Word from '../Components/Word';
import Letters from '../Components/Letters';
import ControlPanel from '../Components/ControlPanel';
import * as C from '../constants';
import { version } from '../../package.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: C.GAME_STATE_CHOOSING_WORD,
      outcome: C.OUTCOME_NONE,
      word: '',
      goodGuesses: '',
      badGuesses: ''
    };
    this.onLetterChosen = this.onLetterChosen.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
  }

  componentDidMount() {
    this.chooseWord();
  }

  onLetterChosen(letter) {
    this.setState(state => {
      if (state.gameState !== C.GAME_STATE_IN_PROGRESS) {
        return null;
      }
      if (state.word.includes(letter)) {
        const newGoodGuesses = state.goodGuesses + letter;
        const gameOver = newGoodGuesses.length === new Set(state.word).size;
        return {
          goodGuesses: newGoodGuesses,
          gameState: gameOver ? C.GAME_STATE_GAME_OVER : state.gameState,
          outcome: gameOver ? C.OUTCOME_WON : state.outcome
        };
      }
      else {
        const newBadGuesses = state.badGuesses + letter;
        const gameOver = newBadGuesses.length === C.MAX_BAD_GUESSES;
        return {
          badGuesses: newBadGuesses,
          gameState: gameOver ? C.GAME_STATE_GAME_OVER : state.gameState,
          outcome: gameOver ? C.OUTCOME_LOST : state.outcome
        };
      }
    });
  }

  onNewGame() {
    this.setState({
      gameState: C.GAME_STATE_CHOOSING_WORD,
      outcome: C.OUTCOME_NONE,
      word: '',
      goodGuesses: '',
      badGuesses: ''
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
      <div className='App'>
        <div className='App-version'>version: {version}</div>
        <Gallows {...this.state} />
        <Word {...this.state} />
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
