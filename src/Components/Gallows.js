import React from 'react';
import PropTypes from 'prop-types';
import { drawGallows } from './gallowsSvg';
import './Gallows.css';

const Gallows = props => {
    const numBadGuesses = props.badGuesses.length;
    return (
        <div>
            <svg id="gallows" ref={drawGallows(numBadGuesses)}></svg>
        </div>
    );
};

Gallows.propTypes = {
    badGuesses: PropTypes.string.isRequired
};

export default Gallows;
