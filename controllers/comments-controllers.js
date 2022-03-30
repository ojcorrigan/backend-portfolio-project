const {insertComment, selectArticleComments} = require('../models/comments-models')
const { selectArticleById} = require('../models/article-models')

exports.getArticleComments = (req, res, next) => {
    const { article_id } = req.params
    const promise1 = selectArticleById(article_id)
    const promise2 = selectArticleComments(article_id)
   
    const dbPromises = [promise1, promise2]
   
    Promise.all(dbPromises)
   .then((result) => {
      res.status(200).send({comments: result[1]})
    }).catch((err) => {
         next(err);
       });
   }
   

exports.postComment = (req, res, next) => {
    const com  = req.body
    const {article_id} = req.params
    
    const promise2 = selectArticleById(article_id)
    const promise1 = insertComment(com.username, com.body, article_id)
   
    const dbPromises = [promise2, promise1]
   
     Promise.all(dbPromises).then((newComment) => {
      res.status(201).send(newComment[1])
     }).catch((err) => {
       next(err)
     })
   }