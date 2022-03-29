const express = require('express');
const app = express();

const{ getTopics } = require('./controllers/topics-controllers')
const { getArticles, getArticleById, getArticleComments } = require('./controllers/article-controllers');
const { getUsers } = require('./controllers/users-controllers');

const { invalidPath } = require('./controllers/misc-controllers');
app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/users', getUsers);

app.get('/api/articles/:article_id/comments', getArticleComments)

app.all('*', invalidPath);

app.use((err, req, res, next) => {
  if (err.msg && err.status) res.status(err.status).send({ msg: err.msg });
  else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === '22P02')
    res.status(400).send({ msg: 'Bad request, invalid article_id' });
  else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});
module.exports = app;
