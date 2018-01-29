import React from 'react';
import { mount } from 'enzyme';
import Letter, * as L from './Letter';

const helper = (mode, className, callCount) => {
  const onLetterChosen = jest.fn();
  const wrapper = mount(
    <Letter
      letter="A"
      mode={mode}
      onLetterChosen={onLetterChosen} />);
  expect(wrapper.find('button').length).toEqual(1);
  expect(wrapper.find('button').text()).toEqual('A');
  expect(wrapper.find('button').hasClass(className)).toEqual(true);
  wrapper.find('button').simulate('click');
  expect(onLetterChosen).toHaveBeenCalledTimes(callCount);
  if (callCount) {
    expect(onLetterChosen).toHaveBeenCalledWith('A');
  }
};

it('renders correctly when letter is available', () => {
  helper(L.LETTER_MODE_AVAILABLE, 'Letter-available', 1);
});

it('renders correctly when letter is a good guess', () => {
  helper(L.LETTER_MODE_CORRECT, 'Letter-correct', 0);
});

it('renders correctly when letter is a bad guess', () => {
  helper(L.LETTER_MODE_INCORRECT, 'Letter-incorrect', 0);
});
