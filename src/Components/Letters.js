import React from 'react';
import PropTypes from 'prop-types';
import LetterButton from './LetterButton';
import './Letters.css';

const Letters = props => {

    const LETTERS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    
    return (
        <div>
            <p>
                {
                    LETTERS.map(letter => {
                        if (props.goodGuesses.includes(letter)) {
                            return <span key={letter} className="Letters-good-guess">{letter}</span>
                        } else {
                            if (props.badGuesses.includes(letter)) {
                                return <span key={letter} className="Letters-bad-guess">{letter}</span>
                            }
                            else {
                                return <LetterButton
                                    key={letter}
                                    letter={letter}
                                    onLetterChosen={props.onLetterChosen}></LetterButton>
                            }
                        }
                    })
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
