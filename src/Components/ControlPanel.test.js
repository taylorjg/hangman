import React from 'react';
import { shallow } from 'enzyme';
import ControlPanel from './ControlPanel';
import * as C from '../constants';

it('renders correctly when choosing a word', () => {
  const wrapper = shallow(<ControlPanel
    gameState={C.GAME_STATE_CHOOSING_WORD}
    outcome={C.OUTCOME_NONE}
    onNewGame={() => { }} />);
  expect(wrapper.children().length).toEqual(0);
});

it('renders correctly when game is in progress', () => {
  const onNewGame = jest.fn();
  const wrapper = shallow(
    <ControlPanel
      gameState={C.GAME_STATE_IN_PROGRESS}
      outcome={C.OUTCOME_NONE}
      onNewGame={onNewGame} />);
  expect(wrapper.children().length).toEqual(0);
});

it('renders correctly when the game is over (won)', () => {
  const onNewGame = jest.fn();
  const wrapper = shallow(
    <ControlPanel
      gameState={C.GAME_STATE_GAME_OVER}
      outcome={C.OUTCOME_WON}
      onNewGame={onNewGame} />);
  const message = <p>You won!</p>;
  expect(wrapper.contains(message)).toEqual(true);
  expect(wrapper.find('button').length).toEqual(1);
  expect(wrapper.find('button').text()).toEqual('New Game');
  wrapper.find('button').simulate('click');
  expect(onNewGame).toHaveBeenCalled();
});

it('renders correctly when the game is over (lost)', () => {
  const onNewGame = jest.fn();
  const wrapper = shallow(
    <ControlPanel
      gameState={C.GAME_STATE_GAME_OVER}
      outcome={C.OUTCOME_LOST}
      onNewGame={onNewGame} />);
  const message = <p>You lost!</p>;
  expect(wrapper.contains(message)).toEqual(true);
  expect(wrapper.find('button').length).toEqual(1);
  expect(wrapper.find('button').text()).toEqual('New Game');
  wrapper.find('button').simulate('click');
  expect(onNewGame).toHaveBeenCalled();
});
