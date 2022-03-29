const db = require('../db/connection');

exports.selectArticleById = (article_id) => {
  return db
    .query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({
          status: 404,
          msg: 'Article not found',
        });
      } else return result.rows[0];
    });
};


exports.updateArticleById = (article_id, votes) => {

  return db.query(
    `UPDATE articles
    SET
    votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`, [votes, article_id]).then((results) => {
      return results.rows[0]
    })

}