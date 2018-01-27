const FALLBACK_WORD_LIST = [
  'react',
  'redux',
  'angular',
  'ember',
  'jasmine',
  'mocha',
  'enzyme',
  'javascript',
  'ecmascript',
  'haskell',
  'pascal',
  'scala',
  'clojure',
  'scheme',
  'typescript',
  'fortran'
];

const pickWordAtRandom = words => {
  const numWords = words.length;
  const randomIndex = Math.floor(Math.random() * numWords);
  return words[randomIndex].toUpperCase();
};

export const fallbackWord = () =>
  pickWordAtRandom(FALLBACK_WORD_LIST);
