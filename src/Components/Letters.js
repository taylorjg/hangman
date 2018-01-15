import React from 'react';
import PropTypes from 'prop-types';
import LetterButton from './LetterButton';
import './Letters.css';

const LETTERS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

const Letters = (props) => {
    return (
        <div>
            <p>
                {
                    LETTERS.map(ch => {
                        if (Array.from(props.goodGuesses).includes(ch)) {
                            return <span key={ch} className="Letters-good-guess">{ch}</span>
                        } else {
                            if (Array.from(props.badGuesses).includes(ch)) {
                                return <span key={ch} className="Letters-bad-guess">{ch}</span>
                            }
                            else {
                                return <LetterButton
                                    key={ch}
                                    letter={ch}
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
