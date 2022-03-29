const express = require('express');
const app = express();
const {
  getTopics,
  getArticleById,
} = require('./controllers/article-controllers');
const { invalidPath } = require('./controllers/misc-controllers');
app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

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
