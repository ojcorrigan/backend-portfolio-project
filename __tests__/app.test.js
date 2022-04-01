const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const app = require('../app');

afterAll(() => db.end());
beforeEach(() => seed(testData));

//Topics tests

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

//Users tests

describe('getUsers', () => {
  test('200: /api/users responds with an array', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.users).toBeInstanceOf(Array);
      });
  });

  test('200 /api/topics responds with an array of users, formatted correctly', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((res) => {
        expect(
          res.body.users.forEach((user) => {
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

describe('getUserById', () => {
  test('200: /api/users/:username responds with an object with username, avatar_url, name', () => {
    return request(app)
      .get('/api/users/rogersop')
      .expect(200)
      .then((result) => {
        expect(result.body.user).toEqual({
          username: 'rogersop',
          name: 'paul',
          avatar_url:
            'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
        });
      });
  });
  test('/api/user/i_dont_exist responds 404 not found', () => {
    return request(app)
      .get('/api/user/i_dont_exist')
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe('invalid path');
      });
  });
});

//Articles tests

describe('getArticleById', () => {
  test('200 GET /api/articles/2 responds with object with correct key values', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((result) => {
        expect(result.body).toBeInstanceOf(Object);
        expect(result.body).toMatchObject({
          author: 'butter_bridge',
          title: expect.any(String),
          body: expect.any(String),
          article_id: 1,
          topic: 'mitch',
          created_at: expect.any(String),
          votes: 100,
          comment_count: '11',
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

  test('400: GET /api/articles/ABD responds with bad request', () => {
    return request(app)
      .get('/api/articles/ABD')
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe('Bad request');
      });
  });
});

describe('getArticles', () => {
  test('200 GET /api/articles responds with an Object with a key of articles with a value of an array of article objects', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((result) => {
        expect(result.body.articles.length).toBe(12);
        expect(result.body.articles).toBeInstanceOf(Array);
        expect(
          result.body.articles.forEach((article) => {
            expect(article).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            });
          })
        );
        expect(Number(result.body.articles[5].comment_count)).toBe(11);
      });
  });

  test('200 GET /api/articles sorts articles by date', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy('created_at', {
          descending: true,
        });
      });
  });
});

describe('patchArticleById', () => {
  test('202 Patch /api/articles/:article_id successfully updates vote count', () => {
    return request(app)
      .patch('/api/articles/2')
      .send({ inc_votes: 5 })
      .expect(202)
      .then((result) => {
        expect(result.body).toMatchObject({
          author: 'icellusedkars',
          title: expect.any(String),
          article_id: 2,
          body: expect.any(String),
          topic: 'mitch',
          created_at: expect.any(String),
          votes: 5,
        });
      });
  });

  test('202 Patch /api/articles/:article_id successfully updates vote count down', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: -5 })
      .expect(202)
      .then((result) => {
        expect(result.body).toMatchObject({
          author: 'butter_bridge',
          title: expect.any(String),
          article_id: 1,
          body: expect.any(String),
          topic: 'mitch',
          created_at: expect.any(String),
          votes: 95,
        });
      });
  });

  test('202 Patch /api/articles/:article_id successfully updates vote count down below 0', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: -105 })
      .expect(202)
      .then((result) => {
        expect(result.body).toMatchObject({
          author: 'butter_bridge',
          title: expect.any(String),
          article_id: 1,
          body: expect.any(String),
          topic: 'mitch',
          created_at: expect.any(String),
          votes: -5,
        });
      });
  });

  test('400 Patch /api/articles/:article_id invalid input for send', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: 'abc' })
      .expect(400);
  });

  test('400 Patch /api/articles/:article_id invalid input for send', () => {
    return request(app).patch('/api/articles/1').send('7').expect(400);
  });

  test('404 Patch /api/articles/:article_id author not found', () => {
    return request(app)
      .patch('/api/articles/1000000')
      .send({ inc_votes: -105 })
      .expect(404);
  });
});

describe('getArticles query', () => {
  test('200: /api/articles/if passed a sortby query will return articles sorted by the query, default DESC', () => {
    return request(app)
      .get('/api/articles?sortby=author')
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy('author', {
          descending: true,
        });
      });
  });
  test('200: /api/articles/if passed a sortby author_id will return articles sorted by the query default DESC', () => {
    return request(app)
      .get('/api/articles?sortby=article_id')
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy('article_id', {
          descending: true,
        });
      });
  });
  test('200: /api/articles/if passed a sortby query will return articles by order included in query', () => {
    return request(app)
      .get('/api/articles?sortby=article_id&&order=ASC')
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy('article_id', {
          ascending: true,
        });
      });
  });
  test('200: /api/articles/if passed a sortby query will return articles by order included in query', () => {
    return request(app)
      .get('/api/articles?sortby=author&&order=ASC')
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy('author', {
          ascending: true,
        });
      });
  });
  test('200: /api/articles/ passed valid query with valid topic', () => {
    return request(app)
      .get('/api/articles?sortby=author&&order=asc&&topic=mitch')
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy('author', {
          ascending: true,
        });
        expect(result.body.articles.length).toBe(11);
        expect(
          result.body.articles.forEach((article) => {
            expect(article.topic).toBe('mitch');
          })
        );
      });
  });
  test('400: /api/articles/if passed an invalid sortby returns 400 ', () => {
    return request(app)
      .get('/api/articles?sortby=authors')
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe('Bad request');
      });
  });
  test('400: /api/articles/if passed an invalid order returns bad request ', () => {
    return request(app)
      .get('/api/articles?sortby=author&&order=DROP DATABASE')
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe('Bad request');
      });
  });
  test('400: /api/articles/if passed an invalid topic returns', () => {
    return request(app)
      .get('/api/articles?sortby=authors&&topic=mountains')
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe('Bad request');
      });
  });
});

//Comments test

describe('getArticleComments', () => {
  test('200: GET /api/articles/:article_id/comments responds with comments object', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then((result) => {
        expect(result.body).toBeInstanceOf(Object);
        expect(result.body.comments).toBeInstanceOf(Array);
        expect(
          result.body.comments.forEach((comment) => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            });
          })
        );
      });
  });

  test('404: GET /api/articles/:article_id/comments article id not found', () => {
    return request(app).get('/api/articles/1000/comments').expect(404);
  });

  test('404: GET /api/articles/:article_id/comments bad article id', () => {
    return request(app).get('/api/articles/a/comments').expect(400);
  });
});

describe('deleteComment', () => {
  test('204: DELETE /api/comments/2 removes comment by comment_id', () => {
    return request(app)
      .delete('/api/comments/2')
      .expect(204)
      .then(() => {
        return request(app).get('/api/comments/2').expect(404);
      });
  });

  test('404: DELETE /api/comments/2000 comment_id not found', () => {
    return request(app)
      .delete('/api/comments/20000')
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe('Comment not found');
      });
  });

  test('400: DELETE /api/comments/A invalid comment id input', () => {
    return request(app)
      .delete('/api/comments/A')
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe('Bad request');
      });
  });
});

describe('postComment', () => {
  test('201: /api/articles/:article_id/comments returns the posted comment and inserts it into comments table', () => {
    return request(app)
      .post('/api/articles/2/comments')
      .send({ username: 'lurker', body: 'hi this is a test comment' })
      .expect(201)
      .then((result) => {
        expect(result.body.comment).toEqual({
          author: 'lurker',
          body: 'hi this is a test comment',
          article_id: 2,
          comment_id: 19,
          created_at: expect.any(String),
          votes: 0,
        });
      });
  });

  test("400: /api/articles/:article_id/comments bad request username doesn't exist", () => {
    return request(app)
      .post('/api/articles/2/comments')
      .send({ username: 'i_dont_exist', body: 'hi this is a test comment' })
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe('Bad request');
      });
  });

  test('404: /api/articles/:article_id/comments article not found', () => {
    return request(app)
      .post('/api/articles/1000/comments')
      .send({ username: 'lurker', body: 'hi this is a test comment' })
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe('Article not found');
      });
  });

  test('400: /api/articles/:article_id/comments body missing', () => {
    return request(app)
      .post('/api/articles/1/comments')
      .send({ username: 'lurker' })
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe('Bad request');
      });
  });
});

describe('patchComment', () => {
  test('202 /api/comments/2 allows user to increment votes', () => {
    return request(app)
      .patch('/api/comments/2')
      .send({ inc_votes: 5 })
      .expect(202)
      .then((result) => {
        expect(result.body.comment).toEqual({
          comment_id: 2,
          body: expect.any(String),
          article_id: 1,
          author: 'butter_bridge',
          votes: 19,
          created_at: '2020-10-31T03:03:00.000Z',
        });
      });
  });
  test('202 /api/comments/2 allows user to decrement votes', () => {
    return request(app)
      .patch('/api/comments/2')
      .send({ inc_votes: -5 })
      .expect(202)
      .then((result) => {
        expect(result.body.comment).toEqual({
          comment_id: 2,
          body: expect.any(String),
          article_id: 1,
          author: 'butter_bridge',
          votes: 9,
          created_at: '2020-10-31T03:03:00.000Z',
        });
      });
  });
  test("404 /api/comments/1000 comment doesn't exisit", () => {
    return request(app)
      .patch('/api/comments/1000')
      .send({ inc_votes: -5 })
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe('Comment not found');
      });
  });
  test('400 /api/comments/abc invalid input', () => {
    return request(app)
      .patch('/api/comments/abc')
      .send({ inc_votes: 5 })
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe('Bad request');
      });
  });
});

//API tests

describe('getApi', () => {
  test('200: /api returns a JSON object with all endpoints and what can be done with them', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((result) => {
        expect(result.body).toBeInstanceOf(Object);
        expect(result.body['DELETE /api/comments/:comment_id']).toEqual({
          description:
            'allows a user to remove a comment by using a comment_id in the URL',
          queries: [],
          exampleResponse: 204,
        });
      });
  });
});
