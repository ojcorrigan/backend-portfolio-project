const db = require('../db/connection');

exports.selectTopics = () => {
  return db.query('SELECT * FROM topics;').then((res) => {
    return res.rows;
  });
};

exports.insertTopic = (name, desc) => {
  if (!name || !desc || typeof name !== 'string' || typeof desc !== 'string') {
    return Promise.reject({
      status: 400,
      msg: 'Bad request',
    });
  }

  return db
    .query(
      `INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *`,
      [name, desc]
    )
    .then((topic) => {
      return topic.rows[0];
    });
};
