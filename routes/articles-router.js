const articlesRouter = require('express').Router();
const {
  getArticleById,
  getArticles,
  patchArticleById,
  postArticle,
} = require('../controllers/article-controllers');
const {
  getArticleComments,
  postComment,
} = require('../controllers/comments-controllers');

articlesRouter
  .get('/', getArticles)
  .post('/', postArticle)
  .get('/:article_id', getArticleById)
  .patch('/:article_id', patchArticleById)
  .get('/:article_id/comments', getArticleComments)
  .post('/:article_id/comments', postComment);

module.exports = articlesRouter;
