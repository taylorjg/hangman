import React from 'react';
import PropTypes from 'prop-types';
import { MAX_BAD_GUESSES } from '../constants';
import './RemainingLives.css';

const RemainingLives = ({ badGuesses }) => {
  return (
    <p>
      <span className="RemainingLives">
        Remaining lives: {MAX_BAD_GUESSES - badGuesses.length}
      </span>
    </p>
  );
};

RemainingLives.propTypes = {
  badGuesses: PropTypes.string.isRequired
};

export default RemainingLives;
