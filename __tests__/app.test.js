const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const app = require('../app');

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe('getTopics', () => {
  test('200: /api/topics responds with an object with key topics and an array', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });
  test('200 /api/topics responds with an array of topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeInstanceOf(Array);
        expect(res.body.topics).toEqual([
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
  test('200 GET /api/articles/2 responds with obeject with correct key values', () => {
    return request(app)
    .get('/api/articles/2')
    .expect(200)
    .then((result) => {
      expect(result.body).toBeInstanceOf(Object);
      expect(result.body).toMatchObject({
        author: 'icellusedkars',
        title: expect.any(String),
        body: expect.any(String),
        article_id: 2,
        topic: 'mitch',
        created_at: expect.any(String),
        votes: 0
      });
    });
  });
  test('404: GET /api/articles/9999999 responds with Article not found', () => {
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
    })
  })
})
describe('getUsers', () => {
  test('200: /api/users responds with an array', () => {
    return request(app)
    .get('/api/users')
    .expect(200)
    .then((res) => {
      expect(res.body).toBeInstanceOf(Array);
    });
  });
  test('200 /api/topics responds with an array of users, formatted correctly', () => {
    return request(app)
    .get('/api/users')
    .expect(200)
    .then((res) => {
      expect(res.body).toBeInstanceOf(Array);
      expect(
        res.body.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
          });
        })
        );
      });
    });
    test('/api/userr responds 404 not found', () => {
      return request(app)
      .get('/api/userr')
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe('invalid path');
      });
    });
  });
  
  describe('getArticles', () => {
    test('200 GET /api/articles responds with an Object with a key of articles with a value of an array of article objects', () => {
      return request(app)
      .get('/api/articles')
      .expect(200)
      .then((result) => {
        expect(result.body.articles.length).toBe(12)
        expect(result.body.articles).toBeInstanceOf(Array)
        expect(result.body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number)
          })
        }))
        expect(Number(result.body.articles[5].comment_count)).toBe(11)
      })
    })
    test('200 GET /api/articles sorts articles by date', () => {
      return request(app)
      .get('/api/articles')
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy('created_at', {descending: true})
      })
      })
    })