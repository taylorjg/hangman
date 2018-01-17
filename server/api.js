const express = require('express');

const WORD_LIST = [
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

const NUM_WORDS = WORD_LIST.length;

const chooseWord = (req, res) => {
    const randomIndex = Math.floor(Math.random() * NUM_WORDS);
    const word = WORD_LIST[randomIndex].toUpperCase();
    res.json({ word });
};

const router = express.Router();
router.post('/chooseWord', chooseWord);

module.exports = router;
