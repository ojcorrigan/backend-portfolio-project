const db = require('../db/connection');

exports.selectArticleComments = (article_id) => {
  
    return db.query(`SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1;`, [article_id])
  .then((result) => {
   return result.rows
 })  

  }

exports.insertComment = (username, body, article_id) => {

    return db.query(
      `INSERT INTO comments
      (author, body, article_id, votes)
      VALUES ($1, $2, $3, 0)
      RETURNING *;`, [username, body, article_id]).then((result) => {
        return result.rows[0]
   
      })
  }