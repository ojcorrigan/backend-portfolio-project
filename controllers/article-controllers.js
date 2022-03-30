
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
 
 
  insertComment(com.username, com.body, article_id).then((newComment) => {
    res.status(202).send(newComment)
  }).catch((err) => {
    next(err)
  })
}