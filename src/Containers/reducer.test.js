import { initialState, reducer } from './reducer';
import * as C from '../constants';
import * as actions from './actions';

it('initial state', () => {
  const actual = reducer(undefined, {});
  expect(actual).toEqual(initialState);
});

it('handles good guesses', () => {
  const oldState = {
    gameState: C.GAME_STATE_IN_PROGRESS,
    outcome: C.OUTCOME_NONE,
    word: 'REACT',
    goodGuesses: '',
    badGuesses: '',
    errorMessage: ''
  };
  const newState = reducer(oldState, actions.chooseLetter('A'));
  expect(newState).toEqual({ ...oldState, goodGuesses: 'A' });
});

it('handles bad guesses', () => {
  const oldState = {
    gameState: C.GAME_STATE_IN_PROGRESS,
    outcome: C.OUTCOME_NONE,
    word: 'REACT',
    goodGuesses: '',
    badGuesses: '',
    errorMessage: ''
  };
  const newState = reducer(oldState, actions.chooseLetter('B'));
  expect(newState).toEqual({ ...oldState, badGuesses: 'B' });
});

it('detects game over / won', () => {
  const oldState = {
    gameState: C.GAME_STATE_IN_PROGRESS,
    outcome: C.OUTCOME_NONE,
    word: 'REACT',
    goodGuesses: 'REAC',
    badGuesses: '',
    errorMessage: ''
  };
  const newState = reducer(oldState, actions.chooseLetter('T'));
  expect(newState).toEqual({
    ...oldState,
    gameState: C.GAME_STATE_GAME_OVER,
    outcome: C.OUTCOME_WON,
    goodGuesses: 'REACT'
  });
});

it('detects game over / lost', () => {
  const word = 'REACT';
  const allBadGuesses = Array.from(word).reduce((acc, ch) => acc.replace(ch, ''), C.LETTERS.join(''));
  const badGuesses = allBadGuesses.substr(0, C.MAX_BAD_GUESSES - 1);
  const oldState = {
    gameState: C.GAME_STATE_IN_PROGRESS,
    outcome: C.OUTCOME_NONE,
    word,
    goodGuesses: '',
    badGuesses,
    errorMessage: ''
  };
  const letter = allBadGuesses.substr(-1);
  const newState = reducer(oldState, actions.chooseLetter(letter));
  expect(newState).toEqual({
    ...oldState,
    gameState: C.GAME_STATE_GAME_OVER,
    outcome: C.OUTCOME_LOST,
    badGuesses: oldState.badGuesses + letter
  });
});

it('ignores guesses when choosing a word', () => {
  const oldState = {
    gameState: C.GAME_STATE_CHOOSING_WORD,
    outcome: C.OUTCOME_NONE,
    word: '',
    goodGuesses: '',
    badGuesses: '',
    errorMessage: ''
  };
  const newState = reducer(oldState, actions.chooseLetter('A'));
  expect(newState).toEqual(oldState);
});

it('ignores guesses when the game is over', () => {
  const oldState = {
    gameState: C.GAME_STATE_GAME_OVER,
    outcome: C.OUTCOME_WON,
    word: 'REACT',
    goodGuesses: 'CRATE',
    badGuesses: 'BDZ',
    errorMessage: ''
  };
  const newState = reducer(oldState, actions.chooseLetter('A'));
  expect(newState).toEqual(oldState);
});

it('ignores good guesses that have already been seen', () => {
  const oldState = {
    gameState: C.GAME_STATE_IN_PROGRESS,
    outcome: C.OUTCOME_NONE,
    word: 'REACT',
    goodGuesses: 'REA',
    badGuesses: 'BD',
    errorMessage: ''
  };
  const newState = reducer(oldState, actions.chooseLetter('E'));
  expect(newState).toEqual(oldState);
});

it('ignores bad guesses that have already been seen', () => {
  const oldState = {
    gameState: C.GAME_STATE_IN_PROGRESS,
    outcome: C.OUTCOME_NONE,
    word: 'REACT',
    goodGuesses: 'REA',
    badGuesses: 'BD',
    errorMessage: ''
  };
  const newState = reducer(oldState, actions.chooseLetter('B'));
  expect(newState).toEqual(oldState);
});

it('ignores non [A-Z] guesses', () => {
  const oldState = {
    gameState: C.GAME_STATE_IN_PROGRESS,
    outcome: C.OUTCOME_NONE,
    word: 'REACT',
    goodGuesses: 'REA',
    badGuesses: 'BD',
    errorMessage: ''
  };
  const newState = reducer(oldState, actions.chooseLetter('1'));
  expect(newState).toEqual(oldState);
});
