import React from 'react';
import { shallow } from 'enzyme';
import Letter, * as L from './Letter';

it('renders correctly when letter is available', () => {
  const onLetterChosen = jest.fn();
  const wrapper = shallow(
    <Letter
      letter="A"
      mode={L.LETTER_MODE_AVAILABLE}
      onLetterChosen={onLetterChosen} />);
  expect(wrapper.find('button').length).toEqual(1);
  expect(wrapper.find('button').text()).toEqual('A');
  wrapper.find('button').simulate('click');
  expect(onLetterChosen).toHaveBeenCalledWith('A');
});

it('renders correctly when letter is a good guess', () => {
  const onLetterChosen = jest.fn();
  const wrapper = shallow(
    <Letter
      letter="A"
      mode={L.LETTER_MODE_CORRECT}
      onLetterChosen={onLetterChosen} />);
  expect(wrapper.find('span').length).toEqual(1);
  expect(wrapper.find('span').text()).toEqual('A');
  expect(wrapper.find('span').hasClass('Letter-correct')).toEqual(true);
});

it('renders correctly when letter is a bad guess', () => {
  const onLetterChosen = jest.fn();
  const wrapper = shallow(
    <Letter
      letter="A"
      mode={L.LETTER_MODE_INCORRECT}
      onLetterChosen={onLetterChosen} />);
  expect(wrapper.find('span').length).toEqual(1);
  expect(wrapper.find('span').text()).toEqual('A');
  expect(wrapper.find('span').hasClass('Letter-incorrect')).toEqual(true);
});
