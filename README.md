# Build Status

Branch  | Status
------  | ------
master  | [![CircleCI](https://circleci.com/gh/taylorjg/hangman/tree/master.svg?style=svg)](https://circleci.com/gh/taylorjg/hangman/tree/master)
develop | [![CircleCI](https://circleci.com/gh/taylorjg/hangman/tree/develop.svg?style=svg)](https://circleci.com/gh/taylorjg/hangman/tree/develop)

# Description

Just practising my React skills by implementing [Hangman](https://en.wikipedia.org/wiki/Hangman_(game)).

Words are chosen from the list of programming languages [here](https://raw.githubusercontent.com/csurfer/gitlang/master/languages.txt). I haven't heard of most of them! I filter the list for entries that consist of only alphabetic characters and are at least 5 characters long.

# Planned Development Steps

* ~~Use [create-react-app](https://github.com/facebookincubator/create-react-app) to create the initial project structure~~
* ~~Basic game functionality (no Redux, no gallows)~~
* ~~Circle CI 2, deployment to Heroku, display app version~~
* ~~Add a basic web api method to choose a word~~
* ~~Enhance the web api method to use an online dictionary or similar~~
* ~~Render the gallows using SVG~~
* Add web api error handling / local fallback
* Improve the UI (Bootstrap etc)
* Add keyboard support
* Add tests
* Convert to Redux

## Further Ideas

* Add a favicon
* Animate the SVG gallows rendering
* Chalk-like look
* Responsive UI
* Sound effects
* Provide facility to enter a guess at the full word
* Support different difficulty levels
* Support different categories of words
* Support phrases

# Workflow

* Do work on a separate feature branch
* PRs should target the develop branch
* To release, merge into the master branch which will deploy to Heroku on successful build/test

# Running in development mode

To run in development mode, we need to run two web servers.
The first is the main development server on port 3000 that is a standard part of `create-react-app`.
This is started via `npm start`.
The second is the Express web server on port 3001 to serve web api requests.
This is started via `node server`.
You then point a web browser to `http://localhost:3000`.
The following line in `package.json` enables proxying of web api requests to the Express web server:

```
  "proxy": "http://localhost:3001/",
```

It does this automatically as described
[here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development):

> Any unrecognized request without a text/html accept header will be redirected to the specified proxy

# Running in production

The app runs in production on [Heroku](https://www.heroku.com/). It is automatically deployed there by [Circle CI](https://circleci.com/) whenever the `master` branch is checked in and the build succeeds.
Deployment is achieved by pushing the entire repo to Heroku. Once this has been done, Heroku checks
the `package.json` for a `heroku-postbuild` script. If it finds one, it is executed. We use the
following script:

```
    "heroku-postbuild": "npm run build && mv build server/public"
```

We build the production version of the app using the standard `create-react-app`
mechanism (`npm run build`).
The resulting artifact is available in `./build`.
We then move this directory to `./server/public` to be served by our Express web server.
Finally, we use a [`Procfile`](https://devcenter.heroku.com/articles/procfile)
to specify the command that will launch our Express web server:

```
web: node server
```

The Express web server serves static content from `./server/public` and also serves our web api method i.e. `GET` requests to `/api/chooseWord`.
