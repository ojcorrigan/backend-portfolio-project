const { selectUsers, selectUserById } = require('../models/users-models');

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((result) => {
      res.status(200).send({ users: result });
    })
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  const { username } = req.params;

  selectUserById(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
