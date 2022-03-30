const { removeComment } = require('../models/comments-models.js')

exports.deleteComment = (req, res, next) => {

    const {comment_id} = req.params
    removeComment(comment_id).then((result) => {
        res.status(204).send(result)
    }).catch((err) => {
        next(err)
    })
}