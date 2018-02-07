import { NUM_GALLOWS_STEPS } from './Components/gallowsSvg';

export const GAME_STATE_CHOOSING_WORD = 0;
export const GAME_STATE_IN_PROGRESS = 1;
export const GAME_STATE_GAME_OVER = 2;

export const OUTCOME_NONE = 0;
export const OUTCOME_WON = 1;
export const OUTCOME_LOST = 2;

export const MAX_BAD_GUESSES = NUM_GALLOWS_STEPS;

export const LETTERS_STRING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const LETTERS_ARRAY = Array.from(LETTERS_STRING);
export const LETTERS_SET = new Set(LETTERS_STRING);
