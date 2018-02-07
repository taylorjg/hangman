import * as AT from './actionTypes';
import * as C from '../constants';

export const initialState = {
  gameState: C.GAME_STATE_CHOOSING_WORD,
  outcome: C.OUTCOME_NONE,
  word: '',
  goodGuesses: new Set(),
  badGuesses: new Set(),
  errorMessage: ''
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.CHOOSE_LETTER:
      if (C.LETTERS_SET.has(action.letter) && state.gameState === C.GAME_STATE_IN_PROGRESS) {
        if (state.word.includes(action.letter)) {
          const newGoodGuesses = new Set(state.goodGuesses).add(action.letter);
          const gameOver = newGoodGuesses.size === new Set(state.word).size;
          return {
            ...state,
            goodGuesses: newGoodGuesses,
            gameState: gameOver ? C.GAME_STATE_GAME_OVER : state.gameState,
            outcome: gameOver ? C.OUTCOME_WON : state.outcome
          };
        }
        else {
          const newBadGuesses = new Set(state.badGuesses).add(action.letter);
          const gameOver = newBadGuesses.size === C.MAX_BAD_GUESSES;
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
