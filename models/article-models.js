const db = require('../db/connection');

exports.selectTopics = () => {
  return db.query('SELECT * FROM topics').then((res) => {
    return res.rows;
  });
};

exports.selectArticleById = (article_id) => {
  return db
    .query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({
          status: 404,
          msg: 'Article not found',
        });
      } else return result.rows[0];
    });
};
