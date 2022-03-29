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

describe('getArticleById', () => {
  test('200: GET /api/articles/2 responds with an article object', () => {
    return request(app)
      .get('/api/articles/2')
      .expect(200)
      .then((result) => {
        expect(result.body).toBeInstanceOf(Object);
      });
  });
  test('200 GET /api/articles/2 responds with obeject with correct key values', () => {
    return request(app)
      .get('/api/articles/2')
      .expect(200)
      .then((result) => {
        expect(result.body).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
      });
  });
  test("400: GET /api/articles/9999999 responds with bad request article doesn't exist", () => {
    return request(app)
      .get('/api/articles/9999999')
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe('Article not found');
      });
  });
  test('400: GET /api/articles/ABD responds with bad request invalid article_id', () => {
    return request(app)
      .get('/api/articles/ABD')
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe('Bad request, invalid article_id');
      });
  });
});
