const articlesRouter = require('express').Router();
const {getArticleById, getArticles, patchArticleById} = require('../controllers/article-controllers')
const {getArticleComments, postComment} = require('../controllers/comments-controllers')

articlesRouter.get('/', getArticles)
articlesRouter.get('/:article_id', getArticleById)
articlesRouter.patch('/:article_id', patchArticleById)
articlesRouter.get('/:article_id/comments', getArticleComments)
articlesRouter.post('/:article_id/comments', postComment)

module.exports = articlesRouter