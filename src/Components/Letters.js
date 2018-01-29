import React from 'react';
import PropTypes from 'prop-types';
import Letter, * as L from './Letter';
import './Letters.css';

const Letters = ({ goodGuesses, badGuesses, onLetterChosen }) => {

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

  return (
    <div>
      {renderRowOfLetters(0)}
      {renderRowOfLetters(1)}
      {renderRowOfLetters(2)}
    </div>
  );
};

Letters.propTypes = {
  goodGuesses: PropTypes.string.isRequired,
  badGuesses: PropTypes.string.isRequired,
  onLetterChosen: PropTypes.func.isRequired
};

export default Letters;
