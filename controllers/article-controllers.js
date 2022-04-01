const {
  selectArticles,
  selectArticleById,
  updateArticleById,
  insertArticle,
  removeArticle,
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
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticle = (req, res, next) => {
  const article = req.body;

  insertArticle(article)
    .then((result) => {
      selectArticleById(result.article_id).then((secondResult) => {
        res.status(201).send({ article: secondResult });
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteArticle = (req, res, next) => {
  const { article_id } = req.params;

  removeArticle(article_id).then(() => {
    res.status(204);
  });
};
