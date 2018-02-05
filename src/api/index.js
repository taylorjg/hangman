import axios from 'axios';
import { fallbackWord } from '../wordList';

export const api = {
  chooseWord: () =>
    axios.get(
      '/api/chooseWord',
      {
        timeout: 1000
      })
      .then(response => response.data)
      .catch(error => ({
        word: fallbackWord(),
        errorMessage: error.message
      }))
};
