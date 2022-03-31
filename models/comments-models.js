const db = require('../db/connection');

exports.removeComment = (comment_id) => {
    return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id])
    .then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: 'Comment not found',
              })
        } else {
        return result.rows[0]}
    })
}

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