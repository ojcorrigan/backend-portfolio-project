const db = require('../db/connection');

exports.selectUsers = () => {
  return db.query('SELECT username FROM users').then((users) => {
    return users.rows;
  });
};

exports.selectUserById = (username) => {
  return db
    .query('SELECT username, name, avatar_url FROM users WHERE username = $1', [
      username,
    ])
    .then((users) => {
      return users.rows[0];
    });
};
