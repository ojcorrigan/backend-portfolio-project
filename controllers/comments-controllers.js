const { removeComment } = require('../models/comments-models.js')

exports.deleteComment = (req, res, next) => {

    const {comment_id} = req.params
 
    console.log(comment_id)
    removeComment()
}