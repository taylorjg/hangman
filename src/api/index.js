import axios from 'axios';

export const api = {
  chooseWord: () =>
    axios.get(
      '/api/chooseWord',
      {
        headers: {
          'accept': 'application/json'
        }
      })
      .then(response => response.data)
};
