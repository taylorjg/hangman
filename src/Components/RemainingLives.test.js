import React from 'react';
import { shallow } from 'enzyme';
import RemainingLives from './RemainingLives';
import * as C from '../constants';

const helper = numBadGuesses => {
  const badGuesses = C.LETTERS.slice(0, numBadGuesses).join('');
  const remainingLives = Math.max(C.MAX_BAD_GUESSES - numBadGuesses, 0);
  const expectedSpanText = `Remaining lives: ${remainingLives}`;
  const wrapper = shallow(<RemainingLives badGuesses={badGuesses} />);
  expect(wrapper.find('span')).toHaveLength(1);
  expect(wrapper.find('span').text()).toBe(expectedSpanText);
};

it('renders the correct number of remaining lives', () => {
  C.LETTERS.forEach((_, index) => helper(index));
});
