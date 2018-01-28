import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import App from './App';
import Gallows from '../Components/Gallows';
import Word from '../Components/Word';
import Letter from '../Components/Letter';
import Letters from '../Components/Letters';
import ControlPanel from '../Components/ControlPanel';
import ErrorPanel from '../Components/ErrorPanel';
import * as C from '../constants';

// TODO: use Jest mocking instead of props.api

it('renders without crashing', () => {
  const apiMock = {
    chooseWord: () => new Promise((/* resolve, reject */) => { })
  };
  const wrapper = shallow(<App api={apiMock} />);
  expect(wrapper.find(Gallows).length).toEqual(1);
  expect(wrapper.find(Word).length).toEqual(1);
  expect(wrapper.find(Letters).length).toEqual(1);
  expect(wrapper.find(ControlPanel).length).toEqual(1);
  expect(wrapper.find(ErrorPanel).length).toEqual(1);
});

it('handles good and bad guesses correctly', async () => {
  const apiMock = {
    chooseWord: () => Promise.resolve({ word: 'REACT' })
  };
  const wrapper = shallow(<App api={apiMock} />);

  expect(wrapper.state('word')).toEqual('');
  expect(wrapper.state('goodGuesses')).toEqual('');
  expect(wrapper.state('badGuesses')).toEqual('');

  const instance = wrapper.instance();
  await instance.componentDidMount();

  expect(wrapper.state('word')).toEqual('REACT');
  expect(wrapper.state('goodGuesses')).toEqual('');
  expect(wrapper.state('badGuesses')).toEqual('');

  instance.onLetterChosen('A');
  expect(wrapper.state('word')).toEqual('REACT');
  expect(wrapper.state('goodGuesses')).toEqual('A');
  expect(wrapper.state('badGuesses')).toEqual('');

  instance.onLetterChosen('B');
  expect(wrapper.state('word')).toEqual('REACT');
  expect(wrapper.state('goodGuesses')).toEqual('A');
  expect(wrapper.state('badGuesses')).toEqual('B');

  instance.onLetterChosen('A');
  expect(wrapper.state('word')).toEqual('REACT');
  expect(wrapper.state('goodGuesses')).toEqual('A');
  expect(wrapper.state('badGuesses')).toEqual('B');

  instance.onLetterChosen('B');
  expect(wrapper.state('word')).toEqual('REACT');
  expect(wrapper.state('goodGuesses')).toEqual('A');
  expect(wrapper.state('badGuesses')).toEqual('B');

  wrapper.unmount();
});

it('handles game over / won correctly', async () => {
  const apiMock = {
    chooseWord: () => Promise.resolve({ word: 'REACT' })
  };
  const wrapper = shallow(<App api={apiMock} />);

  const instance = wrapper.instance();
  await instance.componentDidMount();

  instance.onLetterChosen('R');
  instance.onLetterChosen('E');
  instance.onLetterChosen('A');
  instance.onLetterChosen('C');
  instance.onLetterChosen('T');

  expect(wrapper.state('word')).toEqual('REACT');
  expect(wrapper.state('goodGuesses')).toEqual('REACT');
  expect(wrapper.state('badGuesses')).toEqual('');
  expect(wrapper.state('gameState')).toEqual(C.GAME_STATE_GAME_OVER);
  expect(wrapper.state('outcome')).toEqual(C.OUTCOME_WON);

  wrapper.unmount();
});

it('handles game over / lost correctly', async () => {
  const apiMock = {
    chooseWord: () => Promise.resolve({ word: 'REACT' })
  };
  const wrapper = shallow(<App api={apiMock} />);

  const instance = wrapper.instance();
  await instance.componentDidMount();

  instance.onLetterChosen('B');
  instance.onLetterChosen('D');
  instance.onLetterChosen('F');
  instance.onLetterChosen('G');
  instance.onLetterChosen('H');
  instance.onLetterChosen('I');
  instance.onLetterChosen('J');
  instance.onLetterChosen('K');
  instance.onLetterChosen('L');
  instance.onLetterChosen('M');
  instance.onLetterChosen('N');

  expect(wrapper.state('word')).toEqual('REACT');
  expect(wrapper.state('goodGuesses')).toEqual('');
  expect(wrapper.state('badGuesses')).toEqual('BDFGHIJKLMN');
  expect(wrapper.state('gameState')).toEqual(C.GAME_STATE_GAME_OVER);
  expect(wrapper.state('outcome')).toEqual(C.OUTCOME_LOST);

  wrapper.unmount();
});

it('handles letter button clicks correctly', async () => {
  const apiMock = {
    chooseWord: () => Promise.resolve({ word: 'REACT' })
  };
  const wrapper = mount(<App api={apiMock} />);

  const instance = wrapper.instance();
  await instance.componentDidMount();

  const letterButton = wrapper.findWhere(n => n.exists() && n.prop('letter') === 'A');
  letterButton.simulate('click');

  instance.onLetterChosen('A');
  expect(wrapper.state('word')).toEqual('REACT');
  expect(wrapper.state('goodGuesses')).toEqual('A');
  expect(wrapper.state('badGuesses')).toEqual('');

  wrapper.unmount();
});

it('handles keypresses correctly', async () => {
  const apiMock = {
    chooseWord: () => Promise.resolve({ word: 'REACT' })
  };
  const wrapper = shallow(<App api={apiMock} />);

  const instance = wrapper.instance();
  await instance.componentDidMount();

  const event = new Event('keypress');
  event.key = 'A';
  document.dispatchEvent(event);

  instance.onLetterChosen('A');
  expect(wrapper.state('word')).toEqual('REACT');
  expect(wrapper.state('goodGuesses')).toEqual('A');
  expect(wrapper.state('badGuesses')).toEqual('');

  wrapper.unmount();
});
