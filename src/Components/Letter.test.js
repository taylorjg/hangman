import React from 'react';
import { mount } from 'enzyme';
import Letter, * as L from './Letter';

const helper = (mode, className, callCount) => {
  const onChooseLetter = jest.fn();
  const wrapper = mount(
    <Letter
      letter="A"
      mode={mode}
      onChooseLetter={onChooseLetter} />);
  expect(wrapper.find('button')).toHaveLength(1);
  expect(wrapper.find('button').text()).toBe('A');
  expect(wrapper.find('button').hasClass(className)).toBe(true);
  wrapper.find('button').simulate('click');
  expect(onChooseLetter).toHaveBeenCalledTimes(callCount);
  if (callCount) {
    expect(onChooseLetter).toHaveBeenCalledWith('A');
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
