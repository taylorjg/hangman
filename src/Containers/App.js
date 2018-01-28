import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Gallows from '../Components/Gallows';
import Word from '../Components/Word';
import Letters from '../Components/Letters';
import ControlPanel from '../Components/ControlPanel';
import ErrorPanel from '../Components/ErrorPanel';
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
      badGuesses: '',
      errorMessage: ''
    };
    this.onLetterChosen = this.onLetterChosen.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.establishKeyPressHandler = this.establishKeyPressHandler.bind(this);
  }

  componentDidMount() {
    this.chooseWord();
  }

  onLetterChosen(letter) {
    this.setState(state => {
      if (state.gameState !== C.GAME_STATE_IN_PROGRESS) {
        return null;
      }
      if (state.goodGuesses.includes(letter) || state.badGuesses.includes(letter)) {
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
      badGuesses: '',
      errorMessage: ''
    });
    this.chooseWord();
  }

  onKeyPress(ev) {
    this.onLetterChosen(ev.key.toUpperCase());
  }

  establishKeyPressHandler(element) {
    if (element) {
      this.ownerDocument = element.ownerDocument;
      this.ownerDocument.addEventListener('keypress', this.onKeyPress);
      }
  }

  componentWillUnmount() {
    if (this.ownerDocument) {
      this.ownerDocument.removeEventListener('keypress', this.onKeyPress);
    }
  }

  async chooseWord() {
    const data = await this.props.api.chooseWord();
    this.setState({
      gameState: C.GAME_STATE_IN_PROGRESS,
      word: data.word,
      errorMessage: data.errorMessage || ''
    });
  }

  render() {
    return (
      <div className="App" ref={this.establishKeyPressHandler}>
        <div className="App-version">version: {version}</div>
        <Gallows {...this.state} />
        <Word {...this.state} />
        <Letters {...this.state} onLetterChosen={this.onLetterChosen} />
        <ControlPanel {...this.state} onNewGame={this.onNewGame} />
        <ErrorPanel {...this.state} />
      </div>
    );
  }
}

App.propTypes = {
  api: PropTypes.object.isRequired
};

export default App;
