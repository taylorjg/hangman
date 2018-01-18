const express = require('express');
const fetch = require('node-fetch');

const FALLBACK_WORD_LIST = [
    "react",
    "redux",
    "angular",
    "javascript",
    "ecmascript",
    "haskell",
    "pascal",
    "scala",
    "clojure"
];

const pickWordAtRandom = words => {
    const numWords = words.length;
    const randomIndex = Math.floor(Math.random() * numWords);
    return words[randomIndex].toUpperCase();
};

const chooseWord = (req, res) => {

    const isSuitable = line =>
        line.length >= 5 &&
        line.replace(/[a-zA-Z]/g, '').length === 0;

    fetch('https://raw.githubusercontent.com/csurfer/gitlang/master/languages.txt')
        .then(fetchResponse => fetchResponse.text())
        .then(text => {
            const lines = text.split('\n').map(line => line.trim());
            const words = lines.filter(isSuitable);
            const word = pickWordAtRandom(words);
            return word;
        })
        .catch(() => {
            const word = pickWordAtRandom(FALLBACK_WORD_LIST);
            return word;
        })
        .then(word => {
            const result = { word };
            console.log(`[chooseWord]: returning ${JSON.stringify(result)}`);
            res.json(result);
        });
};

const router = express.Router();
router.post('/chooseWord', chooseWord);

module.exports = router;
