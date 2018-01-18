import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const apiMock = {
  chooseWord: () => new Promise((/* resolve, reject */) => {})
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App api={apiMock} />, div);
});
