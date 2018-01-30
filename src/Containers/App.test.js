import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import RemainingLives from '../Components/RemainingLives';
import Gallows from '../Components/Gallows';
import Word from '../Components/Word';
import Letters from '../Components/Letters';
import ControlPanel from '../Components/ControlPanel';
import ErrorPanel from '../Components/ErrorPanel';
import * as C from '../constants';

jest.mock('../api', () => ({
  api: {
    chooseWord: () => Promise.resolve({ word: 'REACT' })
  }
}));

it('renders child components', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(RemainingLives)).toHaveLength(1);
  expect(wrapper.find(Gallows)).toHaveLength(1);
  expect(wrapper.find(Word)).toHaveLength(1);
  expect(wrapper.find(Letters)).toHaveLength(1);
  expect(wrapper.find(ControlPanel)).toHaveLength(1);
  expect(wrapper.find(ErrorPanel)).toHaveLength(1);
});

it('handles good and bad guesses correctly', async () => {

  const wrapper = shallow(<App />);
  const instance = wrapper.instance();

  expect(wrapper.state('word')).toBe('');
  expect(wrapper.state('goodGuesses')).toBe('');
  expect(wrapper.state('badGuesses')).toBe('');

  await instance.componentDidMount();
  expect(wrapper.state('word')).toBe('REACT');
  expect(wrapper.state('goodGuesses')).toBe('');
  expect(wrapper.state('badGuesses')).toBe('');

  instance.onLetterChosen('A');
  expect(wrapper.state('word')).toBe('REACT');
  expect(wrapper.state('goodGuesses')).toBe('A');
  expect(wrapper.state('badGuesses')).toBe('');

  instance.onLetterChosen('B');
  expect(wrapper.state('word')).toBe('REACT');
  expect(wrapper.state('goodGuesses')).toBe('A');
  expect(wrapper.state('badGuesses')).toBe('B');

  instance.onLetterChosen('A');
  expect(wrapper.state('word')).toBe('REACT');
  expect(wrapper.state('goodGuesses')).toBe('A');
  expect(wrapper.state('badGuesses')).toBe('B');

  instance.onLetterChosen('B');
  expect(wrapper.state('word')).toBe('REACT');
  expect(wrapper.state('goodGuesses')).toBe('A');
  expect(wrapper.state('badGuesses')).toBe('B');
});

it('handles game over / won correctly', async () => {

  const wrapper = shallow(<App />);

  const instance = wrapper.instance();
  await instance.componentDidMount();

  instance.onLetterChosen('R');
  instance.onLetterChosen('E');
  instance.onLetterChosen('A');
  instance.onLetterChosen('C');
  instance.onLetterChosen('T');

  expect(wrapper.state('word')).toBe('REACT');
  expect(wrapper.state('goodGuesses')).toBe('REACT');
  expect(wrapper.state('badGuesses')).toBe('');
  expect(wrapper.state('gameState')).toBe(C.GAME_STATE_GAME_OVER);
  expect(wrapper.state('outcome')).toBe(C.OUTCOME_WON);
});

it('handles game over / lost correctly', async () => {

  const wrapper = shallow(<App />);

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

  expect(wrapper.state('word')).toBe('REACT');
  expect(wrapper.state('goodGuesses')).toBe('');
  expect(wrapper.state('badGuesses')).toBe('BDFGHIJKLMN');
  expect(wrapper.state('gameState')).toBe(C.GAME_STATE_GAME_OVER);
  expect(wrapper.state('outcome')).toBe(C.OUTCOME_LOST);
});

it('non A-Z letter choices are ignored', async () => {

  const wrapper = shallow(<App />);

  const instance = wrapper.instance();
  await instance.componentDidMount();

  instance.onLetterChosen('1');
  expect(wrapper.state('goodGuesses')).toBe('');
  expect(wrapper.state('badGuesses')).toBe('');
});

it('handles letter button clicks correctly', async () => {

  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  await instance.componentDidMount();
  wrapper.update();

  const letterButton = wrapper.findWhere(n =>
    n.exists() && n.prop('letter') === 'A');
  letterButton.simulate('click');

  expect(wrapper.state('word')).toBe('REACT');
  expect(wrapper.state('goodGuesses')).toBe('A');
  expect(wrapper.state('badGuesses')).toBe('');

  wrapper.unmount();
});

it('handles keypresses correctly', async () => {

  const simulateKeypress = letter => {
    const event = new Event('keypress');
    event.key = letter;
    document.dispatchEvent(event);
  };

  const wrapper = mount(<App />);

  const instance = wrapper.instance();
  await instance.componentDidMount();

  simulateKeypress('A');
  expect(wrapper.state('word')).toBe('REACT');
  expect(wrapper.state('goodGuesses')).toBe('A');
  expect(wrapper.state('badGuesses')).toBe('');

  simulateKeypress('B');
  expect(wrapper.state('word')).toBe('REACT');
  expect(wrapper.state('goodGuesses')).toBe('A');
  expect(wrapper.state('badGuesses')).toBe('B');

  wrapper.unmount();
});
