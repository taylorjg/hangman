import React from 'react';
import PropTypes from 'prop-types';
import * as C from '../constants';

const WON_MESSAGE = "You won!";
const LOST_MESSAGE = "You lost!";

const ControlPanel = props => {

    const renderMessage = () =>
        props.gameState === C.GAME_STATE_GAME_OVER
            ? props.outcome === C.OUTCOME_WON
                ? <p>{WON_MESSAGE}</p>
                : <p>{LOST_MESSAGE}</p>
            : "";

    const renderButton = () =>
        props.gameState === C.GAME_STATE_GAME_OVER
            ? <button onClick={props.onNewGame}>New Game</button>
            : "";

    return (
        <div>
            {renderMessage()}
            {renderButton()}
        </div>
    );
};

ControlPanel.propTypes = {
    gameState: PropTypes.number.isRequired,
    outcome: PropTypes.number.isRequired,
    onNewGame: PropTypes.func.isRequired
};

export default ControlPanel;
