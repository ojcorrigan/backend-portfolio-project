const { selectArticles, selectArticleById, selectArticleComments } = require('../models/article-models');

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
}

exports.getArticleComments = (req, res, next) => {
 const { article_id } = req.params
 const promise1 = selectArticleById(article_id)
 const promise2 = selectArticleComments(article_id)

 const dbPromises = [promise1, promise2]

 Promise.all(dbPromises)
.then((result) => {
   res.status(200).send({comments: result[1]})
 }).catch(next)
}

