import React from 'react';
import PropTypes from 'prop-types';
import './Letter.css';

export const LETTER_MODE_AVAILABLE = 0;
export const LETTER_MODE_CORRECT = 1;
export const LETTER_MODE_INCORRECT = 2;

const Letter = props => {

    const getClassName = () => {
        switch (props.mode) {
            case LETTER_MODE_AVAILABLE: return "Letter-available";
            case LETTER_MODE_CORRECT: return "Letter-correct";
            case LETTER_MODE_INCORRECT: return "Letter-incorrect";
            default: return "";
        }
    };

    const renderButton = () =>
        <button
            className="Letter-available"
            onClick={() => props.onLetterChosen(props.letter)}
        >
            {props.letter}
        </button>

    const renderSpan = () =>
        <span
            className={getClassName()}
        >
            {props.letter}
        </span>

    return props.mode === LETTER_MODE_AVAILABLE
        ? renderButton()
        : renderSpan()
};

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    mode: PropTypes.number.isRequired,
    onLetterChosen: PropTypes.func.isRequired
};

export default Letter;
