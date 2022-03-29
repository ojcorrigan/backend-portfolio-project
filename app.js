const express = require('express');
const app = express();
const { getTopics } = require('./controllers/article-controllers');
const { getUsers } = require('./controllers/users-controllers');
const { invalidPath } = require('./controllers/misc-controllers');
app.use(express.json());

app.get('/api/topics', getTopics);

app.get;

app.all('*', invalidPath);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: 'internal server error' });
});
module.exports = app;
