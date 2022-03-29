const { selectArticles, selectArticleById } = require('../models/article-models');

exports.getArticles = (req,res,next) => {
  
  selectArticles().then((result) => {
    res.status(200).send(result)
  })
}

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};