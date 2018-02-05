import * as AT from './actionTypes';
import { api } from '../api';

export const chooseLetter = letter => ({
  type: AT.CHOOSE_LETTER,
  letter
});

export const chooseWordStarted = () => ({
  type: AT.CHOOSE_WORD_STARTED
});

export const chooseWordCompleted = (word, errorMessage) => ({
  type: AT.CHOOSE_WORD_COMPLETED,
  word,
  errorMessage
});

export const newGame = () =>
  async dispatch => {
    dispatch(chooseWordStarted());
    const data = await api.chooseWord();
    dispatch(chooseWordCompleted(data.word, data.errorMessage));
  };
