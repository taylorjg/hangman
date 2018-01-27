const expect = require('chai').expect;
const request = require('supertest');
const axios = require('axios');
const moxios = require('moxios');
const express = require('express');
const api = require('./api');

describe('server-side web api', () => {

  const app = express();
  app.use('/api', api);

  const CHOOSE_WORD_PATH = '/api/chooseWord';
  const REMOTE_CALL_PATH = /languages.txt$/;

  const checkResponse = response => {
    expect(response.statusCode).to.equal(200);
    const word = response.body.word;
    expect(word).to.have.lengthOf.at.least(5);
    expect(word.toUpperCase()).to.equal(word);
  };

  describe('using real remote calls', () => {

    it('succeeds', async () => {
      const response = await request(app).get(CHOOSE_WORD_PATH);
      checkResponse(response);
    });

    it('returns a random word', async () => {
      const NUM_WORDS = 5;
      const range = Array.from(Array(NUM_WORDS).keys());
      const requests = range.map(() => request(app).get(CHOOSE_WORD_PATH));
      const responses = await axios.all(requests);
      responses.forEach(checkResponse);
      const words = responses.map(response => response.body.word);
      const set = new Set(words);
      expect(set.size).to.equal(NUM_WORDS);
    });
  });

  describe('using mocked remote calls', () => {

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('succeeds when remote call succeeds', async () => {

      moxios.stubRequest(REMOTE_CALL_PATH, {
        status: 200,
        responseText: 'scala\nhaskell'
      });

      const response = await request(app).get(CHOOSE_WORD_PATH);
      checkResponse(response);
    });

    it('succeeds when remote call fails', async () => {

      moxios.stubRequest(REMOTE_CALL_PATH, {
        status: 503
      });

      const response = await request(app).get(CHOOSE_WORD_PATH);
      checkResponse(response);
    });

    it('returns a random word when remote call fails', async () => {

      moxios.stubRequest(REMOTE_CALL_PATH, {
        status: 503
      });

      const NUM_WORDS = 3;
      const range = Array.from(Array(NUM_WORDS).keys());
      const requests = range.map(() => request(app).get(CHOOSE_WORD_PATH));
      const responses = await axios.all(requests);
      responses.forEach(checkResponse);
      const words = responses.map(response => response.body.word);
      const set = new Set(words);
      expect(set.size).to.equal(NUM_WORDS);
    });
  });
});
