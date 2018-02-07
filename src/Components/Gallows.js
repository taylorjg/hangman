import React from 'react';
import PropTypes from 'prop-types';
import { drawGallows } from './gallowsSvg';
import './Gallows.css';

const Gallows = ({ badGuesses }) =>
  <svg
    id="gallows"
    viewBox="0 0 300 300"
    ref={drawGallows(badGuesses.size)}>
  </svg>;

Gallows.propTypes = {
  badGuesses: PropTypes.instanceOf(Set).isRequired
};

export default Gallows;
