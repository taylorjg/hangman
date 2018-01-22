import React from 'react';
import PropTypes from 'prop-types';
import * as C from '../constants';
import './Word.css';

const Word = ({ gameState, word, goodGuesses }) => {
    return (
        <p>
            <span className='Word'>
                {
                    gameState === C.GAME_STATE_IN_PROGRESS
                        ? Array.from(word).map(letter =>
                            goodGuesses.includes(letter) ? letter : '-')
                        : word || '?????'
                }
            </span>
        </p>
    );
};

Word.propTypes = {
    gameState: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
    goodGuesses: PropTypes.string.isRequired
};

export default Word;
