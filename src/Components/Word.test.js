import React from 'react';
import { shallow } from 'enzyme';
import Word from './Word';
import * as C from '../constants';

it('renders correctly when game is over', () => {
  const wrapper = shallow(
    <Word
      gameState={C.GAME_STATE_GAME_OVER}
      word="REACT"
      goodGuesses={new Set("EC")} />);
  expect(wrapper.find('span')).toHaveLength(1);
  expect(wrapper.find('span').text()).toBe('REACT');
  expect(wrapper.find('span').hasClass('Word')).toBe(true);
});

it('renders correctly when game is in progress', () => {
  const wrapper = shallow(
    <Word
      gameState={C.GAME_STATE_IN_PROGRESS}
      word="PROGRESS"
      goodGuesses={new Set("POS")} />);
  expect(wrapper.find('span')).toHaveLength(1);
  expect(wrapper.find('span').text()).toBe('P-O---SS');
  expect(wrapper.find('span').hasClass('Word')).toBe(true);
});

it('renders correctly when word is being chosen', () => {
  const wrapper = shallow(
    <Word
      gameState={C.GAME_STATE_CHOOSING_WORD}
      word=""
      goodGuesses={new Set("")} />);
  expect(wrapper.find('span')).toHaveLength(1);
  expect(wrapper.find('span').hasClass('Word-loading')).toBe(true);
  expect(wrapper.find('span').find('img')).toHaveLength(1);
});
