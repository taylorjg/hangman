import React from 'react';
import { mount } from 'enzyme';
import Gallows from './Gallows';
import * as C from '../constants';

const helper = badGuesses => {
  const wrapper = mount(<Gallows badGuesses={badGuesses} />);
  expect(wrapper.find('svg')).toHaveLength(1);
  const svgNode = wrapper.getDOMNode();
  expect(svgNode.querySelectorAll('path')).toHaveLength(badGuesses.length);
  wrapper.unmount();
};

it('renders a path element for each bad guess', () => {
  const range = Array.from(Array(C.MAX_BAD_GUESSES + 1).keys());
  range.forEach(n => helper(C.LETTERS.slice(0, n).join('')));
});
