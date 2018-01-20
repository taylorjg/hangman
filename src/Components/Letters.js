import React from 'react';
import PropTypes from 'prop-types';
import Letter, * as L from './Letter';

const Letters = props => {

    const LETTERS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

    const getLetterMode = letter => {
        if (props.goodGuesses.includes(letter)) {
            return L.LETTER_MODE_CORRECT;
        }
        if (props.badGuesses.includes(letter)) {
            return L.LETTER_MODE_INCORRECT;
        }
        return L.LETTER_MODE_AVAILABLE;
    };

    return (
        <div>
            <p>
                {
                    LETTERS.map(letter =>
                        <Letter
                            key={letter}
                            letter={letter}
                            mode={getLetterMode(letter)}
                            onLetterChosen={props.onLetterChosen}>
                        </Letter>
                    )
                }
            </p>
        </div>
    );
};

Letters.propTypes = {
    goodGuesses: PropTypes.string.isRequired,
    badGuesses: PropTypes.string.isRequired,
    onLetterChosen: PropTypes.func.isRequired
};

export default Letters;
