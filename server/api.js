const express = require("express");
const axios = require("axios");

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
        line.replace(/[a-zA-Z]/g, "").length === 0;

    axios.get("https://raw.githubusercontent.com/csurfer/gitlang/master/languages.txt-crap")
        .then(response => {
            const lines = response.data.split("\n").map(line => line.trim());
            const words = lines.filter(isSuitable);
            return pickWordAtRandom(words);
        })
        .catch(error => {
            console.log(`[chooseWord] ${error}`);
            return pickWordAtRandom(FALLBACK_WORD_LIST);
        })
        .then(word => {
            const result = { word };
            console.log(`[chooseWord] returning ${JSON.stringify(result)}`);
            res.json(result);
        });
};

const router = express.Router();
router.get("/chooseWord", chooseWord);

module.exports = router;
