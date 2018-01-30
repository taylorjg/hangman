import React from 'react';
import { shallow } from 'enzyme';
import Letters from './Letters';
import Letter, * as L from './Letter';
import * as C from '../constants';

// QWERTY layout
const LETTERS = Array.from('QWERTYUIOPASDFGHJKLZXCVBNM');

const letterToMode = letter => {
  switch (letter) {
    case 'A':
    case 'E':
      return L.LETTER_MODE_CORRECT;
    case 'X':
    case 'Y':
      return L.LETTER_MODE_INCORRECT;
    default:
      return L.LETTER_MODE_AVAILABLE;
  }
};

const helper = (letterComponent, index) => {
  const letter = LETTERS[index];
  const mode = letterToMode(letter);
  expect(letterComponent.prop('letter')).toBe(letter);
  expect(letterComponent.prop('mode')).toBe(mode);
};

it('renders correctly when a game is in progress', () => {
  const onLetterChosen = jest.fn();
  const wrapper = shallow(
    <Letters
      gameState={C.GAME_STATE_IN_PROGRESS}
      goodGuesses="AE"
      badGuesses="XY"
      onLetterChosen={onLetterChosen} />);
  const letterComponents = wrapper.find(Letter);
  expect(letterComponents).toHaveLength(26);
  letterComponents.forEach(helper);
});

it('renders renders nothing when choosing a word', () => {
  const onLetterChosen = jest.fn();
  const wrapper = shallow(
    <Letters
      gameState={C.GAME_STATE_CHOOSING_WORD}
      goodGuesses="AE"
      badGuesses="XY"
      onLetterChosen={onLetterChosen} />);
  expect(wrapper.children()).toHaveLength(0);
});

it('renders renders nothing when game is over', () => {
  const onLetterChosen = jest.fn();
  const wrapper = shallow(
    <Letters
      gameState={C.GAME_STATE_GAME_OVER}
      goodGuesses="AE"
      badGuesses="XY"
      onLetterChosen={onLetterChosen} />);
  expect(wrapper.children()).toHaveLength(0);
});
