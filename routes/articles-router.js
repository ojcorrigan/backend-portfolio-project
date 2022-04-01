const articlesRouter = require('express').Router();
const {
  getArticleById,
  getArticles,
  patchArticleById,
  postArticle,
  deleteArticle,
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
  .post('/:article_id/comments', postComment)
  .delete('/:article_id', deleteArticle);

module.exports = articlesRouter;
