import React from 'react';
import PropTypes from 'prop-types';
import { MAX_BAD_GUESSES } from '../constants';
import './RemainingLives.css';

const RemainingLives = ({ badGuesses }) => {
  return (
    <p>
      <span className="RemainingLives">
        Remaining lives: {Math.max(MAX_BAD_GUESSES - badGuesses.size, 0)}
      </span>
    </p>
  );
};

RemainingLives.propTypes = {
  badGuesses: PropTypes.instanceOf(Set).isRequired
};

export default RemainingLives;
