import * as AT from './actionTypes';
import * as C from '../constants';

export const initialState = {
  gameState: C.GAME_STATE_CHOOSING_WORD,
  outcome: C.OUTCOME_NONE,
  word: '',
  goodGuesses: '',
  badGuesses: '',
  errorMessage: ''
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.CHOOSE_LETTER:
      if (/^[A-Z]$/.test(action.letter) &&
        state.gameState === C.GAME_STATE_IN_PROGRESS &&
        !state.goodGuesses.includes(action.letter) &&
        !state.badGuesses.includes(action.letter)) {
        if (state.word.includes(action.letter)) {
          const newGoodGuesses = state.goodGuesses + action.letter;
          const gameOver = newGoodGuesses.length === new Set(state.word).size;
          return {
            ...state,
            goodGuesses: newGoodGuesses,
            gameState: gameOver ? C.GAME_STATE_GAME_OVER : state.gameState,
            outcome: gameOver ? C.OUTCOME_WON : state.outcome
          };
        }
        else {
          const newBadGuesses = state.badGuesses + action.letter;
          const gameOver = newBadGuesses.length === C.MAX_BAD_GUESSES;
          return {
            ...state,
            badGuesses: newBadGuesses,
            gameState: gameOver ? C.GAME_STATE_GAME_OVER : state.gameState,
            outcome: gameOver ? C.OUTCOME_LOST : state.outcome
          };
        }
      }
      return state;

    case AT.CHOOSE_WORD_STARTED:
      return initialState;

    case AT.CHOOSE_WORD_COMPLETED:
      return {
        ...state,
        gameState: C.GAME_STATE_IN_PROGRESS,
        word: action.word,
        errorMessage: action.errorMessage || ''
      };

    default:
      return state;
  }
};
