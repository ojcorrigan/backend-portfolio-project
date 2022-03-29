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

exports.selectArticles = () => {
  return db.query(
    `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, 
    COUNT(comment_id) as comment_count
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id 
    ORDER BY created_at DESC;`).then((result) => {
    return result.rows
  })
}

exports.selectArticleComments = (article_id) => {
  return db.query(`SELECT comment_id, votes, created_at, author, body from comments WHERE article_id = $1;`, [article_id]).then((result) => {
    return result.rows
  })
}