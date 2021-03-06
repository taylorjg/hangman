import React from 'react';
import PropTypes from 'prop-types';
import * as C from '../constants';
import './Word.css';

const Word = ({ gameState, word, goodGuesses }) => {

  const renderWord = () => {
    switch (gameState) {

      case C.GAME_STATE_IN_PROGRESS:
        return (
          <span className="Word">
            {
              Array.from(word).map(letter =>
                goodGuesses.has(letter) ? letter : '-')
            }
          </span>
        );

      case C.GAME_STATE_GAME_OVER:
        return <span className="Word">{word}</span>;

      case C.GAME_STATE_CHOOSING_WORD:
      default:
        return (
          <span className="Word-loading">
            <img src="spinner.gif" alt="Spinner" />
            (choosing a word...)
          </span>
        );
    }
  };

  return (
    <p>
      {renderWord()}
    </p>
  );
};

Word.propTypes = {
  gameState: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
  goodGuesses: PropTypes.instanceOf(Set).isRequired
};

export default Word;
