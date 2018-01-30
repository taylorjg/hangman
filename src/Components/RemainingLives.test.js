import React from 'react';
import { shallow } from 'enzyme';
import RemainingLives from './RemainingLives';
import { MAX_BAD_GUESSES } from '../constants';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const helper = numBadGuesses => {
  const badGuesses = LETTERS.substr(0, numBadGuesses);
  const remainingLives = MAX_BAD_GUESSES - numBadGuesses;
  const expectedSpanText = `Remaining lives: ${remainingLives}`;
  const wrapper = shallow(<RemainingLives badGuesses={badGuesses} />);
  expect(wrapper.find('span')).toHaveLength(1);
  expect(wrapper.find('span').text()).toBe(expectedSpanText);
};

it('renders the correct number of remaining lives', () => {
  Array.from(LETTERS).forEach((_, index) => helper(index));
});
