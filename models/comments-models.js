const db = require('../db/connection');

exports.removeComment = (comment_id) => {
  return db
    .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [
      comment_id,
    ])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({
          status: 404,
          msg: 'Comment not found',
        });
      } else {
        return result.rows[0];
      }
    });
};

exports.selectArticleComments = (article_id) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1;`,
      [article_id]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.insertComment = (username, body, article_id) => {
  return db
    .query(
      `INSERT INTO comments
      (author, body, article_id, votes)
      VALUES ($1, $2, $3, 0)
      RETURNING *;`,
      [username, body, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.updateComment = (comment_id, votes) => {
  if (typeof votes !== 'number' || !votes) {
    return Promise.reject({
      status: 400,
      msg: 'Bad request',
    });
  }

  return db
    .query(
      `UPDATE comments SET votes = votes + $1 
      WHERE comment_id = $2 RETURNING *;`,
      [votes, comment_id]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({
          status: 404,
          msg: 'Comment not found',
        });
      } else {
        return result.rows[0];
      }
    });
};
