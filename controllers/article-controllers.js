const { selectArticleById,updateArticleById } = require('../models/article-models');

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


exports.patchArticleById = (req, res, next) => {
  const{ article_id} = req.params
  const{ body }= req.body
}