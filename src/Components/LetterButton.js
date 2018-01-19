import React from 'react';
import PropTypes from 'prop-types';

const LetterButton = props => {
    return (
        <button onClick={() => props.onLetterChosen(props.letter)}>{props.letter}</button>
    );
};

LetterButton.propTypes = {
    letter: PropTypes.string.isRequired,
    onLetterChosen: PropTypes.func.isRequired
};

export default LetterButton;
