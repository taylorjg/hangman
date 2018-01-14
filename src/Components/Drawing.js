import React from 'react';
import PropTypes from 'prop-types';

const Drawing = (props) => {
    return (
        <div>
            <p>TODO: Drawing (length: {props.badGuesses.length})</p>
        </div>
    );
};

Drawing.propTypes = {
    badGuesses: PropTypes.string.isRequired
};

export default Drawing;
