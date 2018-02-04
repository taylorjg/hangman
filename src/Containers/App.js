import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RemainingLives from '../Components/RemainingLives';
import Gallows from '../Components/Gallows';
import Word from '../Components/Word';
import Letters from '../Components/Letters';
import ControlPanel from '../Components/ControlPanel';
import ErrorPanel from '../Components/ErrorPanel';
import * as actions from './actions';
import { version } from '../../package.json';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.establishKeyPressHandler = this.establishKeyPressHandler.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.onNewGame();
  }

  componentWillUnmount() {
    if (this.ownerDocument) {
      this.ownerDocument.removeEventListener('keypress', this.onKeyPress);
    }
  }

  establishKeyPressHandler(element) {
    if (element) {
      this.ownerDocument = element.ownerDocument;
      this.ownerDocument.addEventListener('keypress', this.onKeyPress);
    }
  }

  onKeyPress(ev) {
    this.props.onChooseLetter(ev.key.toUpperCase());
  }

  render() {
    return (
      <div className="App" ref={this.establishKeyPressHandler}>
        <div className="App-version">version: {version}</div>
        <div id="panes">
          <div id="pane1">
            <RemainingLives {...this.props} />
            <Gallows {...this.props} />
          </div>
          <div id="pane2">
            <Word {...this.props} />
            <Letters {...this.props} />
            <ControlPanel {...this.props} />
            <ErrorPanel {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  gameState: PropTypes.number.isRequired,
  outcome: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
  goodGuesses: PropTypes.string.isRequired,
  badGuesses: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChooseLetter: PropTypes.func.isRequired,
  onNewGame: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onChooseLetter: letter => dispatch(actions.chooseLetter(letter)),
  onNewGame: () => dispatch(actions.newGame())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
