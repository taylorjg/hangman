import React from 'react';
import { shallow } from 'enzyme';
import Word from './Word';
import * as C from '../constants';

it('renders correctly when game is over', () => {
  const wrapper = shallow(
    <Word
      gameState={C.GAME_STATE_GAME_OVER}
      word="REACT"
      goodGuesses="EC" />);
  expect(wrapper.find('span').length).toEqual(1);
  expect(wrapper.find('span').text()).toEqual('REACT');
  expect(wrapper.find('span').hasClass('Word')).toEqual(true);
});

it('renders correctly when game is in progress', () => {
  const wrapper = shallow(
    <Word
      gameState={C.GAME_STATE_IN_PROGRESS}
      word="PROGRESS"
      goodGuesses="POS" />);
  expect(wrapper.find('span').length).toEqual(1);
  expect(wrapper.find('span').text()).toEqual('P-O---SS');
  expect(wrapper.find('span').hasClass('Word')).toEqual(true);
});

it('renders correctly when word is being chosen', () => {
  const wrapper = shallow(
    <Word
      gameState={C.GAME_STATE_CHOOSING_WORD}
      word=""
      goodGuesses="" />);
  expect(wrapper.find('span').length).toEqual(1);
  expect(wrapper.find('span').hasClass('Word-loading')).toEqual(true);
  expect(wrapper.find('span').find('img').length).toEqual(1);
});
