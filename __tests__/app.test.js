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
        comment_count: "11"
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

    describe('getArticleComments', () => {
      test('200: GET /api/articles/:article_id/comments responds with comments object', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((result) => {
          expect(result.body).toBeInstanceOf(Object)
          expect(result.body.comments).toBeInstanceOf(Array)
          expect(result.body.comments.forEach((comment) => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number), 
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String)

            })
          }))
        })
      })
      test('404: GET /api/articles/:article_id/comments article id not found', () => {
        return request(app)
        .get('/api/articles/1000/comments')
        .expect(404)
      })
      test('404: GET /api/articles/:article_id/comments bad article id', () => {
        return request(app)
        .get('/api/articles/a/comments')
        .expect(400)
      })
    })


describe('patchArticleById', () => {
  test('202 Patch /api/articles/:article_id successfully updates vote count', () => {
    return request(app)
    .patch('/api/articles/2')
    .send({inc_votes: 5})
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
    })
  })
  test('202 Patch /api/articles/:article_id successfully updates vote count down', () => {
    return request(app)
    .patch('/api/articles/1')
    .send({inc_votes: -5})
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
    })
  })
  test('202 Patch /api/articles/:article_id successfully updates vote count down below 0', () => {
    return request(app)
    .patch('/api/articles/1')
    .send({inc_votes: -105})
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
    })
  })
  test('400 Patch /api/articles/:article_id invalid input for send', () => {
    return request(app)
    .patch('/api/articles/1')
    .send({inc_votes: 'abc'})
    .expect(400)
  })
  test('400 Patch /api/articles/:article_id invalid input for send', () => {
    return request(app)
    .patch('/api/articles/1')
    .send('7')
    .expect(400)
  })
  test('404 Patch /api/articles/:article_id author not found', () => {
    return request(app)
    .patch('/api/articles/1000000')
    .send({inc_votes: -105})
    .expect(404)
  })
})

describe('postComment', () => {
  test('201: /api/articles/:article_id/comments returns the posted comment and inserts it into comments table', () => {
    return request(app)
    .post('/api/articles/2/comments')
    .send({username: 'lurker',
            body: "hi this is a test comment"})
    .expect(201)
    .then((result) => {
      expect(result.body).toEqual({author: 'lurker',
      body: "hi this is a test comment", 
      article_id: 2,
      comment_id: 19,
      created_at: expect.any(String),
      votes:0
      }) 
    })
  })
  test('400: /api/articles/:article_id/comments bad request username doesn\'t exist', () => {
    return request(app)
    .post('/api/articles/2/comments')
    .send({username: 'i_dont_exist',
    body: "hi this is a test comment"})
    .expect(400)
    .then((result) => {
      expect(result.body.msg).toBe('Bad request')
    })
  })
  test('404: /api/articles/:article_id/comments article not found', () => {
    return request(app)
    .post('/api/articles/1000/comments')
    .send({username: 'lurker',
    body: "hi this is a test comment"})
    .expect(404)
    .then((result) => {
      expect(result.body.msg).toBe('Article not found')
    })
  })
  test('400: /api/articles/:article_id/comments body missing', () => {
    return request(app)
    .post('/api/articles/1/comments')
    .send({username: 'lurker'
    })
    .expect(400)
    .then((result) => {
      expect(result.body.msg).toBe('Bad request')
    })
  })
})
  

