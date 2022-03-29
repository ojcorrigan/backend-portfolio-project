const { selectArticles, selectArticleById, selectArticleComments } = require('../models/article-models');

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

exports.getArticles = (req,res,next) => {
  
  selectArticles().then((result) => {
    res.status(200).send({articles: result})
  })
}

exports.getArticleComments = (req, res, next) => {
 const { article_id } = req.params
  selectArticleComments(article_id).then((comments) => {
    res.status(200).send({ comments })
  })
}