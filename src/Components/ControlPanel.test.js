import React from 'react';
import { shallow } from 'enzyme';
import ControlPanel from './ControlPanel';
import * as C from '../constants';

const setup = (gameState, outcome) => {
  const onNewGame = jest.fn();
  const wrapper = shallow(
    <ControlPanel
      gameState={gameState}
      outcome={outcome}
      onNewGame={onNewGame} />);
  return { wrapper, onNewGame };
};

it('renders correctly when choosing a word', () => {
  const { wrapper } = setup(C.GAME_STATE_CHOOSING_WORD, C.OUTCOME_NONE);
  expect(wrapper.children()).toHaveLength(0);
});

it('renders correctly when game is in progress', () => {
  const { wrapper } = setup(C.GAME_STATE_IN_PROGRESS, C.OUTCOME_NONE);
  expect(wrapper.children()).toHaveLength(0);
});

it('renders correctly when the game is over (won)', () => {
  const { wrapper, onNewGame } = setup(C.GAME_STATE_GAME_OVER, C.OUTCOME_WON);
  const message = <p>You won!</p>;
  expect(wrapper.contains(message)).toBe(true);
  expect(wrapper.find('button')).toHaveLength(1);
  expect(wrapper.find('button').text()).toBe('New Game');
  wrapper.find('button').simulate('click');
  expect(onNewGame).toHaveBeenCalled();
});

it('renders correctly when the game is over (lost)', () => {
  const { wrapper, onNewGame } = setup(C.GAME_STATE_GAME_OVER, C.OUTCOME_LOST);
  const message = <p>You lost!</p>;
  expect(wrapper.contains(message)).toBe(true);
  expect(wrapper.find('button')).toHaveLength(1);
  expect(wrapper.find('button').text()).toBe('New Game');
  wrapper.find('button').simulate('click');
  expect(onNewGame).toHaveBeenCalled();
});
