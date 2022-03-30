
const { selectArticles, selectArticleById,updateArticleById, insertComment } = require('../models/article-models');


exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
};

exports.getArticles = (req,res,next) => {
  
  selectArticles().then((result) => {
    res.status(200).send({articles: result})
  })
    .catch((err) => {
      next(err);
    });
}

exports.patchArticleById = (req, res, next) => {
  const{ article_id } = req.params
  const votes = req.body.inc_votes

  updateArticleById(article_id, votes).then((result) => {
    res.status(202).send(result)
  }).catch((err) => {
    next(err);
  })
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