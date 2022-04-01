exports.customError = (err, req, res, next) => {
  if (err.msg && err.status) res.status(err.status).send({ msg: err.msg });
  else {
    next(err);
  }
};

exports.psqlError = (err, req, res, next) => {
  errors = ['22P02', '23503', '23502'];
  if (errors.includes(err.code)) {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    next(err);
  }
};

exports.serverError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
};
