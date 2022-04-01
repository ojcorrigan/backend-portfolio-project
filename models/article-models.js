const db = require('../db/connection');

exports.selectArticleById = (article_id) => {
  return db
    .query(
      'SELECT articles.*, COUNT(comment_id) as comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;',
      [article_id]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({
          status: 404,
          msg: 'Article not found',
        });
      } else return result.rows[0];
    });
};

exports.selectArticles = (sortby = 'created_at', order = 'DESC', topic) => {
  const validSortBy = [
    'title',
    'article_id',
    'topic',
    'created_at',
    'votes',
    'author',
  ];
  const validOrder = ['ASC', 'DESC', 'asc', 'desc'];
  const topicArr = [];

  if (!validSortBy.includes(sortby) || !validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  let queryString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, 
COUNT(comment_id) as comment_count
FROM articles 
LEFT JOIN comments ON comments.article_id = articles.article_id`;

  if (topic) {
    queryString += ` WHERE topic LIKE $1`;
    topicArr.push(topic);
  }

  queryString += ` GROUP BY articles.article_id ORDER BY ${sortby} ${order};`;

  return db.query(queryString, topicArr).then((result) => {
    return result.rows;
  });
};

exports.updateArticleById = (article_id, votes) => {
  if (typeof votes !== 'number') {
    return Promise.reject({
      status: 400,
      msg: 'Bad request',
    });
  }
  return db
    .query(
      `UPDATE articles
    SET
    votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`,
      [votes, article_id]
    )
    .then((results) => {
      if (!results.rows.length) {
        return Promise.reject({
          status: 404,
          msg: 'Article not found',
        });
      } else return results.rows[0];
    });
};
