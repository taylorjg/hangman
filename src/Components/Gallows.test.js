import React from 'react';
import { mount } from 'enzyme';
import Gallows from './Gallows';
import { MAX_BAD_GUESSES } from '../constants';

const helper = badGuesses => {
  const wrapper = mount(<Gallows badGuesses={badGuesses} />);
  expect(wrapper.find('svg')).toHaveLength(1);
  const svgNode = wrapper.getDOMNode();
  expect(svgNode.querySelectorAll('path')).toHaveLength(badGuesses.length);
};

it('renders correctly for the given number of bad guesses', () => {
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const range = Array.from(Array(MAX_BAD_GUESSES + 1).keys());
  range.forEach(n => helper(LETTERS.substr(0, n)));
});
