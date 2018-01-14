import React from 'react';
import PropTypes from 'prop-types';

const Word = (props) => {
    return (
        <div>
            <p>
                {Array.from(props.word).map(ch => props.goodGuesses.includes(ch) ? ch : "-")}
            </p>
        </div>
    );
};

Word.propTypes = {
    word: PropTypes.string.isRequired,
    goodGuesses: PropTypes.string.isRequired
};

export default Word;
