const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const app = require('../app');

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe('getTopics', () => {
  test('200: /api/topics responds with an array', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
  test('200 /api/topics responds with an array of topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toEqual([
          {
            description: 'The man, the Mitch, the legend',
            slug: 'mitch',
          },
          {
            description: 'Not dogs',
            slug: 'cats',
          },
          {
            description: 'what books are made of',
            slug: 'paper',
          },
        ]);
      });
  });
  test('/api/topic responds 404 not found', () => {
    return request(app)
      .get('/api/topic')
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe('invalid path');
      });
  });
});

describe('getUsers', () => {
  xtest('200: /api/users responds with an array', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
});
