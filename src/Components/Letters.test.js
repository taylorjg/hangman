import React from 'react';
import { shallow } from 'enzyme';
import Letters from './Letters';
import Letter, * as L from './Letter';
import * as C from '../constants';

const setup = gameState => {
  const onLetterChosen = jest.fn();
  return shallow(
    <Letters
      gameState={gameState}
      goodGuesses="AE"
      badGuesses="XY"
      onLetterChosen={onLetterChosen} />);
};

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
  const letter = C.LETTERS[index];
  const mode = letterToMode(letter);
  expect(letterComponent.prop('letter')).toBe(letter);
  expect(letterComponent.prop('mode')).toBe(mode);
};

it('renders correctly when a game is in progress', () => {
  const wrapper = setup(C.GAME_STATE_IN_PROGRESS);
  const letterComponents = wrapper.find(Letter);
  expect(letterComponents).toHaveLength(26);
  letterComponents.forEach(helper);
});

it('renders renders nothing when choosing a word', () => {
  const wrapper = setup(C.GAME_STATE_CHOOSING_WORD);
  expect(wrapper.children()).toHaveLength(0);
});

it('renders renders nothing when game is over', () => {
  const wrapper = setup(C.GAME_STATE_GAME_OVER);
  expect(wrapper.children()).toHaveLength(0);
});
