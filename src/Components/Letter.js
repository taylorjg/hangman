import React from 'react';
import PropTypes from 'prop-types';
import './Letter.css';

export const LETTER_MODE_AVAILABLE = 0;
export const LETTER_MODE_CORRECT = 1;
export const LETTER_MODE_INCORRECT = 2;

const Letter = ({ letter, mode, onChooseLetter }) => {

  const getClassName = () => {
    switch (mode) {
      case LETTER_MODE_AVAILABLE: return 'Letter-available';
      case LETTER_MODE_CORRECT: return 'Letter-correct';
      case LETTER_MODE_INCORRECT: return 'Letter-incorrect';
      default: return '';
    }
  };

  const renderButton = () =>
    <button
      className={'Letter ' + getClassName()}
      onClick={() => onChooseLetter(letter)}
      disabled={mode !== LETTER_MODE_AVAILABLE}
    >
      {letter}
    </button>;

  return renderButton();
};

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  onChooseLetter: PropTypes.func.isRequired
};

export default Letter;
