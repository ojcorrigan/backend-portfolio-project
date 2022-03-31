const express = require('express');
const app = express();

const { getApi } = require('./controllers/app-controllers')

const{ getTopics } = require('./controllers/topics-controllers')

const { getArticles, getArticleById, patchArticleById } = require('./controllers/article-controllers');

const {getArticleComments, postComment} = require('./controllers/comments-controllers')

const { deleteComment } = require('./controllers/comments-controllers')

const { getUsers } = require('./controllers/users-controllers');

const { invalidPath } = require('./controllers/misc-controllers');
app.use(express.json());

app.get('/api', getApi)

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/users', getUsers);

app.get('/api/articles/:article_id/comments', getArticleComments)

app.patch('/api/articles/:article_id', patchArticleById)

app.delete('/api/comments/:comment_id', deleteComment)

app.post('/api/articles/:article_id/comments', postComment)

app.all('*', invalidPath);

app.use((err, req, res, next) => {
  if (err.msg && err.status) res.status(err.status).send({ msg: err.msg });
  else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  errors = ['22P02', '23503', '23502' ]
  if(errors.includes(err.code)){
    res.status(400).send({ msg: 'Bad request'})
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});
module.exports = app;
