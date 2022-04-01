const topicsRouter = require('express').Router();
const { getTopics, postTopic } = require('../controllers/topics-controllers');

topicsRouter.get('/', getTopics).post('/', postTopic);

module.exports = topicsRouter;
