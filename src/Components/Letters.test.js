import React from 'react';
import { shallow } from 'enzyme';
import Letters from './Letters';
import Letter, * as L from './Letter';

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
  expect(letterComponent.prop('letter')).toEqual(letter);
  expect(letterComponent.prop('mode')).toEqual(mode);
};

it('renders correctly', () => {
  const onLetterChosen = jest.fn();
  const wrapper = shallow(
    <Letters
      goodGuesses="AE"
      badGuesses="XY"
      onLetterChosen={onLetterChosen} />);
  const letterComponents = wrapper.find(Letter);
  expect(letterComponents.length).toEqual(26);
  letterComponents.forEach(helper);
});
