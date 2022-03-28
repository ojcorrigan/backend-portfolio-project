const express = require('express');
const app = express();
const { getTopics, getArticleById } = require('./controllers/controllers');
const { invalidPath } = require('./controllers/misc-controllers');
app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.all('*', invalidPath);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: 'internal server error' });
});
module.exports = app;
