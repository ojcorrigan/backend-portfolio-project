const {
  selectArticles,
  selectArticleById,
  updateArticleById,
  insertArticle,
} = require('../models/article-models');

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

exports.getArticles = (req, res, next) => {
  const { sortby, order, topic } = req.query;
  selectArticles(sortby, order, topic)
    .then((result) => {
      res.status(200).send({ articles: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const votes = req.body.inc_votes;
  updateArticleById(article_id, votes)
    .then((result) => {
      res.status(202).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticle = (req, res, next) => {
  const article = req.body;

  insertArticle(article)
    .then((article) => {
      console.log(article);
      res.status(202).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
