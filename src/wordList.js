const WORD_LIST = [
  'react',
  'redux',
  'angular',
  'javascript',
  'ecmascript'
];

const NUM_WORDS = WORD_LIST.length;

export default () =>
  WORD_LIST[Math.floor(Math.random() * NUM_WORDS)].toUpperCase();
