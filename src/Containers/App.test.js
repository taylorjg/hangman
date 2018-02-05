import React from 'react';
import { mount } from 'enzyme';
import { App } from './App';
import RemainingLives from '../Components/RemainingLives';
import Gallows from '../Components/Gallows';
import Word from '../Components/Word';
import Letters from '../Components/Letters';
import ControlPanel from '../Components/ControlPanel';
import ErrorPanel from '../Components/ErrorPanel';
import * as C from '../constants';

jest.mock('../api', () => ({
  api: {
    chooseWord: () => new Promise(() => {})
  }
}));

const setup = () => {
  const onChooseLetter = jest.fn();
  const onNewGame = jest.fn();
  const wrapper = mount(
    <App
      gameState={C.GAME_STATE_IN_PROGRESS}
      outcome={C.OUTCOME_NONE}
      word={'REACT'}
      goodGuesses={''}
      badGuesses={''}
      errorMessage={''}
      onChooseLetter={onChooseLetter}
      onNewGame={onNewGame}
    />);
  return {
    wrapper,
    onChooseLetter,
    onNewGame
  };
};

it('renders child components', () => {
  const { wrapper } = setup();
  expect(wrapper.find(RemainingLives)).toHaveLength(1);
  expect(wrapper.find(Gallows)).toHaveLength(1);
  expect(wrapper.find(Word)).toHaveLength(1);
  expect(wrapper.find(Letters)).toHaveLength(1);
  expect(wrapper.find(ControlPanel)).toHaveLength(1);
  expect(wrapper.find(ErrorPanel)).toHaveLength(1);
  wrapper.unmount();
});

it('handles key presses correctly', async () => {

  const simulateKeyPress = letter => {
    const event = new Event('keypress');
    event.key = letter;
    document.dispatchEvent(event);
  };

  const { wrapper, onChooseLetter } = setup();

  simulateKeyPress('A');
  expect(onChooseLetter).toHaveBeenCalledTimes(1);
  expect(onChooseLetter).toHaveBeenCalledWith('A');

  wrapper.unmount();
});
