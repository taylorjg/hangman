# Build Status

Branch  | Status
------  | ------
master  | [![CircleCI](https://circleci.com/gh/taylorjg/hangman/tree/master.svg?style=svg)](https://circleci.com/gh/taylorjg/hangman/tree/master)
develop | [![CircleCI](https://circleci.com/gh/taylorjg/hangman/tree/develop.svg?style=svg)](https://circleci.com/gh/taylorjg/hangman/tree/develop)

# Description

Just practising my React skills by implementing [Hangman](https://en.wikipedia.org/wiki/Hangman_(game)).

# Planned Development Steps

* ~~Use [create-react-app](https://github.com/facebookincubator/create-react-app) to create the initial project structure~~
* ~~Basic game functionality (no Redux, no SVG)~~
* ~~Circle CI 2, deployment to Heroku, display version~~
* ~~Add a basic web api method to choose a word~~
* ~~Enhance the web api method to use an online dictionary or similar~~
* Improve the UI (Bootstrap etc), favicon ?
* Add keyboard support
* Add web api error handling / local fallback
* Add rendering of the gallows etc using SVG
* Add tests
* Convert to Redux

## Further Ideas

* Animate the rendering
* Chalk-like look
* Responsive UI
* Sound effects
* Provide facility to enter a guess at the full word
* Support different difficulty levels
* Support different categories of words

# Workflow

* Do work on a separate feature branch
* PRs should target the develop branch
* To release, merge into the master branch which will deploy to Heroku on successful build/test
