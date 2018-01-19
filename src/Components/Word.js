import React from 'react';
import PropTypes from 'prop-types';
import * as C from '../constants';

const Word = props => {
    return (
        <div>
            <p>
                {
                    props.gameState === C.GAME_STATE_IN_PROGRESS
                        ? Array.from(props.word).map(letter =>
                            props.goodGuesses.includes(letter) ? letter : "_")
                        : <span>{props.word || "?????"}</span>
                }
            </p>
        </div>
    );
};

Word.propTypes = {
    gameState: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
    goodGuesses: PropTypes.string.isRequired
};

export default Word;
