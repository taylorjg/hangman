import React from 'react';
import PropTypes from 'prop-types';
import * as C from '../constants';

const WON_MESSAGE = "You won!";
const LOST_MESSAGE = "You lost!";

const renderMessage = props =>
    props.gameState === C.GAME_STATE_GAME_OVER
        ? props.outcome === C.OUTCOME_WON
            ? <p>{WON_MESSAGE}</p>
            : <p>{LOST_MESSAGE}</p>
        : "";

const renderButton = props =>
    props.gameState === C.GAME_STATE_GAME_OVER
        ? <button onClick={props.onNewGame}>New Game</button>
        : "";

const ControlPanel = props => {
    return (
        <div>
            {renderMessage(props)}
            {renderButton(props)}
        </div>
    );
};

ControlPanel.propTypes = {
    word: PropTypes.string.isRequired,
    goodGuesses: PropTypes.string.isRequired,
    badGuesses: PropTypes.string.isRequired,
    onNewGame: PropTypes.func.isRequired
};

export default ControlPanel;
