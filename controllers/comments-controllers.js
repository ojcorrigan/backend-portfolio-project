const {
  insertComment,
  selectArticleComments,
  removeComment,
  updateComment,
} = require('../models/comments-models');
const { selectArticleById } = require('../models/article-models');

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  const promise1 = selectArticleById(article_id);
  const promise2 = selectArticleComments(article_id);
  const dbPromises = [promise1, promise2];

  Promise.all(dbPromises)
    .then((returnedPromises) => {
      res.status(200).send({ comments: returnedPromises[1] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const com = req.body;
  const { article_id } = req.params;
  const promise2 = selectArticleById(article_id);
  const promise1 = insertComment(com.username, com.body, article_id);
  const dbPromises = [promise2, promise1];

  Promise.all(dbPromises)
    .then((returnedPromises) => {
      res.status(201).send({ comment: returnedPromises[1] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const votes = req.body.inc_votes;

  updateComment(comment_id, votes)
    .then((comment) => {
      res.status(202).send({ comment: comment[0] });
    })
    .catch((err) => {
      next(err);
    });
};
