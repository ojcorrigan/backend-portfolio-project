const express = require('express');
const app = express();

app.use(express.json());

app.get('api/topics', getTopics);

modules.exports = app;
