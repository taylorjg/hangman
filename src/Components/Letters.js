import React from 'react';
import PropTypes from 'prop-types';
import Letter, * as L from './Letter';
import * as C from '../constants';
import './Letters.css';

const Letters = ({ gameState, goodGuesses, badGuesses, onLetterChosen }) => {

  const LETTER_ROWS = [
    Array.from('QWERTYUIOP'),
    Array.from('ASDFGHJKL'),
    Array.from('ZXCVBNM')
  ];

  const getLetterMode = letter => {
    if (goodGuesses.includes(letter)) {
      return L.LETTER_MODE_CORRECT;
    }
    if (badGuesses.includes(letter)) {
      return L.LETTER_MODE_INCORRECT;
    }
    return L.LETTER_MODE_AVAILABLE;
  };

  const renderRowOfLetters = row =>
    <div className="Letters-row">
      {
        LETTER_ROWS[row].map(letter =>
          <Letter
            key={letter}
            letter={letter}
            mode={getLetterMode(letter)}
            onLetterChosen={onLetterChosen}>
          </Letter>
        )
      }
    </div>;

  const renderRowsOfLetters = () =>
    <div>
      {renderRowOfLetters(0)}
      {renderRowOfLetters(1)}
      {renderRowOfLetters(2)}
    </div>;

  return gameState === C.GAME_STATE_IN_PROGRESS && renderRowsOfLetters();
};

Letters.propTypes = {
  gameState: PropTypes.number.isRequired,
  goodGuesses: PropTypes.string.isRequired,
  badGuesses: PropTypes.string.isRequired,
  onLetterChosen: PropTypes.func.isRequired
};

export default Letters;
