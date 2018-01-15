import React from 'react';
import PropTypes from 'prop-types';
import * as C from '../constants';

const ControlPanel = (props) => {
    return (
        <div>
            {(() => {
                switch (props.gameState) {
                    case C.GAME_STATE_GAME_OVER:
                        switch (props.outcome) {
                            case C.OUTCOME_WON:
                                return <p>GAME OVER | WON</p>;
                            case C.OUTCOME_LOST:
                                return <p>GAME OVER | LOST</p>;
                            default:
                                return <p>Unknown game state</p>;
                        }
                    case C.GAME_STATE_IN_PROGRESS:
                        return <p>IN PROGRESS</p>;
                    default:
                        return <p>Unknown outcome</p>;
                }
            })()}
            {
                props.gameState === C.GAME_STATE_GAME_OVER
                ? <button onClick={props.onNewGame}>New Game</button>
                : ""
            }
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
